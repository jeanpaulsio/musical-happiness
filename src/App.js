import React, { Component } from "react";
import { getDrivingDistance } from "./api";
import { splitStringByChar, calculateDepth } from "./lib/utils";
import Input from "./components/Input";

import "./App.css";

class App extends Component {
  state = { bracketMatcherValue: "" };

  renderDepth = input => {
    const arrayOfChars = splitStringByChar(input);

    return calculateDepth(arrayOfChars);
  };

  handleFetchDrivingDistance = () => {
    getDrivingDistance({
      origins: "138 S Adams St, Glendale CA",
      destinations: "5454 Rosewood Street, Montclair, CA 91763"
    })
  }

  render() {
    return (
      <div>
        <h2>Problem 1 - Array Depth</h2>
        <Input
          value={this.state.bracketMatcherValue}
          placeholder="Type an array"
          onChange={e => this.setState({ bracketMatcherValue: e.target.value })}
        />
        <section className="problem-1-result">
          Array Depth: {this.renderDepth(this.state.bracketMatcherValue)}
        </section>
        <section className="problem-explanation">
          <p>
            The algorithm to calculate the array's depth is written in linear
            time - <code>O(n)</code>. My first thought was to implement a
            solution that iterated through each item and recursively popped
            arrays while keeping track of something like a
            <code>maxDepth</code>. However, this wouldn't be performant. In the
            worst case, an algorithm like this would be exponential. Imagine
            trying to calculate the depth of
            <code>[[[[[[]]]]], [[[[[]]]]], [[[]]]]</code>.
          </p>

          <p>
            Instead we use a stack! Our time complexity remains{" "}
            <code>O(n)</code>
            because we just need a single pass.
          </p>
        </section>

        <h2>Problem 2 - Grepping</h2>
        <section className="problem-explanation">
          <p>
            We can use <code>ack</code> to search a directory. First change into
            the directory:
          </p>
          <pre>$ cd website</pre>

          <p>Execute the search:</p>
          <pre>$ ack 'shittylistings.com' -il --type=html</pre>

          <p>
            The <code>-i</code> flag tells ack to ignore case in our pattern.
            The <code>-l</code> flag tells ack to list the file names. Without
            this flag, ack will display the contents of the file. With 50k
            files, the results might be overwhelming. Lastly, note that we are
            only searching <code>html</code> files as well.
          </p>
        </section>

        <h2>Problem 3 - Map API</h2>

        <button onClick={this.handleFetchDrivingDistance}>
          Get Driving Distance
        </button>
      </div>
    );
  }
}

export default App;
