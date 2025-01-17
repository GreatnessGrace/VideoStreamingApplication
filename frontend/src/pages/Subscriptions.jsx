import React from "react";
import "../styles/Subscription.css";

const Subscription = () => {
  const plans = [
    { name: "Basic Plan", price: "$10/month", features: ["Feature 1", "Feature 2"] },
    { name: "Pro Plan", price: "$20/month", features: ["Feature 1", "Feature 2", "Feature 3"] },
    { name: "Premium Plan", price: "$30/month", features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"] },
  ];

  return (
    <div className="subscription-container">
      <h2>Choose Your Plan</h2>
      <div className="plans">
        {plans.map((plan, index) => (
          <div key={index} className="plan">
            <h3>{plan.name}</h3>
            <p className="price">{plan.price}</p>
            <ul>
              {plan.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
            <button>Select</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscription;
