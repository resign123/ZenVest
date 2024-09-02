import React from "react";
import users from "../../public/users.png";
import algo from "../../public/algo.png";
import trade from "../../public/trade.png";
import api from "../../public/api.png";

export default function Achievement() {
  return (
    <div>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 md:mx-36 mx-10 mt-10 mb-44">
        <div className="card border-0 shadow-md p-4 rounded-md text-center mb-10">
          <div className="text-center mb-4">
            <img src={users} alt="Users" width="80" className="mx-auto" />
          </div>
          <div className="text-5xl font-bold mt-4 mb-2">
            <strong>405k+</strong>
          </div>
          <div className="text-lg font-medium">signups</div>
        </div>

        <div className="card border-0 shadow-md p-4 rounded-md text-center mb-10">
          <div className="text-center mb-4">
            <img src={algo} alt="Algorithms" width="80" className="mx-auto" />
          </div>
          <div className="text-5xl font-bold mt-4 mb-2">
            <strong>~60k</strong>
          </div>
          <div className="text-lg font-medium">algos</div>
        </div>

        <div className="card border-0 shadow-md p-4 rounded-md text-center mb-10">
          <div className="text-center mb-4">
            <img src={trade} alt="Trades" width="80" className="mx-auto" />
          </div>
          <div className="text-5xl font-bold mt-4 mb-2">
            <strong>~175k</strong>
          </div>
          <div className="text-lg font-medium">live trades daily</div>
        </div>

        <div className="card border-2 shadow-md p-4 rounded-md text-center mb-10">
          <div className="text-center mb-4">
            <img src={api} alt="APIs" width="80" className="mx-auto" />
          </div>
          <div className="text-5xl font-bold mt-4 mb-2">
            <strong>100+</strong>
          </div>
          <div className="text-lg font-medium">broker APIs connected</div>
        </div>
      </div>
    </div>
  );
}
