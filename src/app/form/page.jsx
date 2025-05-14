import React from 'react'
import Form_Page from "@/components/form";
import ClerkAuth from "@/components/ClerkAuth";

const Form = () => {
  return (
    <div className="relative">
      <ClerkAuth />
      <Form_Page />
    </div>
  )
}

export default Form