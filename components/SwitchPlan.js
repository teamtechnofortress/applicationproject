import { useState } from "react";

const SwitchPlan = ({ customerId }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handlePlanSwitch = async (newPriceId) => {
        setLoading(true);
        setError(null);
        customerId = "cus_RwjKTE6wQZ3iRK";
        newPriceId = "price_1R2oilIBEl0UnhG5tD4M6hb7";
        const response = await fetch("/api/user/switch-plan", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ customerId, newPriceId }),
        });

        const data = await response.json();

        if (data.error) {
            setError(data.error);
        } else {
            alert("Plan switched successfully!");
        }

        setLoading(false);
    };

    return (
        <div>
            {error && <p className="text-red-500">{error}</p>}
            <button
                className="btn mt-4"
                onClick={() => handlePlanSwitch("price_1R2oilIBEl0UnhG5tD4M6hb7")}
                disabled={loading}
            >
                {loading ? "Switching..." : "Switch to 3 Months Plan"}
            </button>
            <button
                className="btn mt-4"
                onClick={() => handlePlanSwitch("price_1R2oilIBEl0UnhG5qLbyj6Qc")}
                disabled={loading}
            >
                {loading ? "Switching..." : "Switch to 6 Months Plan"}
            </button>
            <button
                className="btn mt-4"
                onClick={() => handlePlanSwitch("price_1R2oilIBEl0UnhG5NqQwt5GU")}
                disabled={loading}
            >
                {loading ? "Switching..." : "Switch to 12 Months Plan"}
            </button>
        </div>
    );
};

export default SwitchPlan;
