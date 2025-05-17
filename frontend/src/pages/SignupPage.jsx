import React, { useState } from "react";
import SignupLeftSide from "../components/SignupPage/SignupLeftSide";
import SignupRightSide from "../components/SignupPage/SignupRightSide";

const SignupPage = () => {
    return (
        <div className="flex h-screen w-screen bg-[#f5f5f0]">
            <SignupRightSide />
            <SignupLeftSide />
        </div>
    );
};

export default SignupPage;
