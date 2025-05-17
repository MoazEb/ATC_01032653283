import React, { useState } from "react";
import LoginLeftSide from "../components/LoginPage/LoginLeftSide";
import LoginRightSide from "../components/LoginPage/LoginRightSide";

const LoginPage = () => {
    return (
        <div className="flex h-screen w-screen bg-[#f5f5f0]">
            <LoginRightSide />
            <LoginLeftSide />
        </div>
    );
};

export default LoginPage;
