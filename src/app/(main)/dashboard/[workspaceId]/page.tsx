"use client";
import { useParams } from "next/navigation";
import React, { useState } from "react";

const WorkspacePage = () => {
  const params = useParams();

  return (
    <div>
      <h1>Workspace Parameters</h1>
      <pre>{JSON.stringify(params, null, 2)}</pre>
    </div>
  );
};
export default WorkspacePage;
