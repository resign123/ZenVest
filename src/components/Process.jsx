import React from "react";
import graph from "../../public/bar-graph.png";
import stratergy from "../../public/stratergy.png";
import social from "../../public/social.png";
import backtesting from "../../public/backtesting.png";

export default function Process() {
  return (
    <>
      <h1 className=" text-3xl md:text-4xl font-bold custom-process md:mx-44 mt-24">
        Here's How we do it...
      </h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 md:mx-36 mx-10 mt-10">
        <div className="md:mx-8 mb-20">
          <div>
            <img
              src={graph}
              alt="graph"
              width="80px"
              className="mb-5 md:mx-5"
            />
          </div>
          <div>
            <h1 className=" text-xl mb-3 font-semibold">
              Our Download Free Trading Engine. At your beck and call.
            </h1>
          </div>
          <div className="card-line"></div>
          <div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
              commodi dolorem alias dignissimos iusto odit quae sed nam
              exercitationem laborum nemo fugit, deleniti, ullam illo voluptates
              nostrum ipsam facere voluptas.
            </p>
          </div>
        </div>
        <div className="md:mx-8 mb-20">
          <div>
            <img
              src={stratergy}
              alt="graph"
              width="80px"
              className="mb-5 md:mx-5"
            />
          </div>
          <div>
            <h1 className=" text-xl mb-3 font-semibold">
              The magic of our strategy building wizard.
            </h1>
          </div>
          <div className="card-line"></div>
          <div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
              commodi dolorem alias dignissimos iusto odit quae sed nam
              exercitationem laborum nemo fugit, deleniti, ullam illo voluptates
              nostrum ipsam facere voluptas.
            </p>
          </div>
        </div>
        <div className="md:mx-8 mb-20">
          <div>
            <img
              src={social}
              alt="graph"
              width="80px"
              className="mb-5 md:mx-5"
            />
          </div>
          <div>
            <h1 className=" text-xl mb-3 font-semibold">
              Social trading. A strategic marketplace.
            </h1>
          </div>
          <div className="card-line"></div>
          <div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
              commodi dolorem alias dignissimos iusto odit quae sed nam
              exercitationem laborum nemo fugit, deleniti, ullam illo voluptates
              nostrum ipsam facere voluptas.
            </p>
          </div>
        </div>
        <div className="md:mx-8 mb-20">
          <div>
            <img
              src={backtesting}
              alt="graph"
              width="80px"
              className="mb-5 md:mx-5"
            />
          </div>
          <div>
            <h1 className=" text-xl mb-3 font-semibold">
              Our backtesting engine. Before going forward.
            </h1>
          </div>
          <div className="card-line"></div>
          <div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
              commodi dolorem alias dignissimos iusto odit quae sed nam
              exercitationem laborum nemo fugit, deleniti, ullam illo voluptates
              nostrum ipsam facere voluptas.
            </p>
          </div>
        </div>

        {/* <div>
            i2
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div>
            i3
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div>
            i4
            <div></div>
            <div></div>
            <div></div>
        </div> */}
      </div>
    </>
  );
}
