import React, { Component } from "react";
import { getDrivingDistance } from "./api";
import { splitStringByChar, calculateDepth } from "./lib/utils";
import Problem from "./components/Problem";
import Input from "./components/Input";

import "./App.css";

class App extends Component {
  state = {
    bracketMatcherValue: "",
    origins: "",
    destinations: "",
    fetchingResponse: false
  };

  renderDepth = input => {
    let validArray = true;
    try {
      JSON.parse(input);
    } catch (e) {
      validArray = false;
    }
    const arrayOfChars = splitStringByChar(input);

    return validArray && calculateDepth(arrayOfChars);
  };

  handleFetchDrivingDistance = async (origins, destinations) => {
    this.setState({ fetchingResponse: true });
    await getDrivingDistance(
      { origins, destinations },
      ({ distance, error }) => {
        this.setState({ distance, distanceError: error });
      }
    );
    this.setState({ fetchingResponse: false });
  };

  render() {
    const { origins, destinations } = this.state;

    return [
      <Problem
        key="Problem 1"
        title="Problem 1 - Array Depth"
        render={() => {
          return (
            <div>
              <Input
                value={this.state.bracketMatcherValue}
                placeholder="Enter a valid array"
                onChange={e =>
                  this.setState({ bracketMatcherValue: e.target.value })
                }
              />
              <section className="problem-result">
                Array Depth: {this.renderDepth(this.state.bracketMatcherValue)}
              </section>
              <section className="problem-explanation">
                <p>
                  The algorithm to calculate the array's depth is written in
                  linear time - <code>O(n)</code>. My first thought was to
                  implement a solution that iterated through each item and
                  recursively popped arrays while keeping track of something
                  like a
                  <code>maxDepth</code>. However, this wouldn't be performant.
                  In the worst case, an algorithm like this would be
                  exponential. Imagine trying to calculate the depth of
                  <code>[[[[[[]]]]], [[[[[]]]]], [[[]]]]</code>.
                </p>

                <p>
                  Instead we use a stack! Our time complexity remains{" "}
                  <code>O(n)</code>
                  because we just need a single pass.
                </p>

                <p>
                  <a
                    className="link"
                    rel="noopener noreferrer"
                    href="https://github.com/jeanpaulsio/musical-happiness/blob/master/src/lib/utils.js"
                    target="_blank">
                    Solution
                  </a>
                  <a
                    className="link"
                    rel="noopener noreferrer"
                    href="https://github.com/jeanpaulsio/musical-happiness/blob/master/src/lib/utils.test.js"
                    target="_blank">
                    Tests
                  </a>
                </p>
              </section>
            </div>
          );
        }}
      />,

      <Problem
        key="Problem 2"
        title="Problem 2 - Grepping"
        render={() => {
          return (
            <section className="problem-explanation">
              <p>
                We can use <code>ack</code> to search a directory. First change
                into the directory:
              </p>
              <pre>$ cd website</pre>

              <p>Execute the search:</p>
              <pre>$ ack 'shittylistings.com' -il --type=html</pre>

              <p>
                The <code>-i</code> flag tells ack to ignore case in our
                pattern. The <code>-l</code> flag tells ack to list the file
                names. Without this flag, ack will display the contents of the
                file. With 50k files, the results might be overwhelming. Lastly,
                note that we are only searching <code>html</code> files as well.
              </p>
            </section>
          );
        }}
      />,

      <Problem
        key="Problem 3"
        title="Problem 3 - Map API"
        render={() => {
          return (
            <div>
              <Input
                value={origins}
                placeholder="Starting Location"
                onChange={e => this.setState({ origins: e.target.value })}
              />

              <Input
                value={destinations}
                placeholder="Destination"
                onChange={e => this.setState({ destinations: e.target.value })}
              />
              <button
                className="button-primary"
                onClick={() =>
                  this.handleFetchDrivingDistance(origins, destinations)
                }>
                {this.state.fetchingResponse
                  ? "Calculating..."
                  : "Get Driving Distance"}
              </button>
              {this.state.distance && (
                <section className="problem-result">
                  {this.state.distance} miles
                </section>
              )}
              {this.state.distanceError && (
                <section className="problem-result">
                  {this.state.distanceError}
                </section>
              )}
              <section className="problem-explanation">
                <p>
                  This MVP for the wrapper around Google's Distance Matrix API
                  is implemented with Ruby on Rails. A single{" "}
                  <code>POST /distance</code>
                  endpoint takes an <code>origins</code> and a{" "}
                  <code>destinations</code>
                  parameter in the request body. We hide the need to pass in an
                  API key by letting the wrapper handle that.
                </p>

                <p>
                  Because calculation of driving distance does not depend on a
                  <code>time</code> parameter - this has not been implemented to
                  avoid passing unnecessary data.
                </p>

                <p>
                  Should this wrapper be extended to be more feature rich,
                  passing in a <code>time</code> param could be useful to
                  display estimated traffic. Other useful features might include
                  returning different times based on mode of transportation.
                </p>

                <p>
                  The usefulness of this feature depends on where it's
                  implemented. Ideally, it should exist in a place that involves
                  zero typing - otherwise it's no different than just going to
                  maps.google.com and typing in 2 addresses to see driving
                  distance. I could imagine this feature inside of an app that
                  showing agents can visit. The agent is prompted to allow
                  location permissions so that we can grab their
                  geo-coordinates. Then, we could reverse geocode to get their
                  location in a readable address and display projected travel
                  times without them having to do anything! Of course this
                  assumes that location properties can be grabbed off of
                  something like a <code>property</code> object.
                </p>

                <p>
                  <a
                    className="link"
                    rel="noopener noreferrer"
                    href="https://github.com/jeanpaulsio/symmetrical-octo-palm-tree"
                    target="_blank">
                    API Repo
                  </a>
                </p>
              </section>
            </div>
          );
        }}
      />
    ];
  }
}

export default App;
