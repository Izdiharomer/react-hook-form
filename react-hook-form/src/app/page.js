'use client'

import React from "react";
import { useForm } from "react-hook-form";

export default function Home() {
  const { register, formState: { errors }, handleSubmit } = useForm();
  
  const onSubmit = data => alert(`Your name is ${data.firstName} ${data.lastName}, you are ${data.gender}, your Email is ${data.email}, your birthday is ${data.birthday}, your phone number is ${data.phoneNumber}, your password is ${data.password}, and you accepted all the terms and conditions`)

  //test
  

  return (
    <form className="submitForm" onSubmit={handleSubmit(onSubmit)}>

      <h1>Register</h1>

      {/* first name and last name inputs: required, must be more than 3 letters and less than 20 letter, accept only letters */}
      <input
       {...register("firstName", {
         required: true,
         maxLength: {
          value: 20,
          message: "Please enter a valid name (maximum 20 characters)"
         },
         minLength: {
         value: 3,
         message: "Please enter a valid name (minimum 3 characters)"},
         pattern: {
         value: /^[A-Za-z]+$/i,
         message: "Please enter a valid name (must not contain digits and special characters)"}})}

         placeholder="First Name"
         aria-invalid={errors.firstName ? "true" : "false"}/>
         {errors.firstName?.type === 'required' && (
         <p role="alert">First name is required</p>)}
         {errors.firstName?.message && (
        <p role="alert">{errors.firstName.message}</p>)}

<input
  {...register("lastName", {
    required: "Last name is required",
    maxLength: {
      value: 20,
      message: "Please enter a valid name (maximum 20 characters)"
    },
    minLength: {
      value: 3,
      message: "Please enter a valid name (minimum 3 characters)"
    },
    pattern: {
      value: /^[A-Za-z]+$/i,
      message: "Please enter a valid name (must not contain digits and special characters)"
    }
  })}
  placeholder="Last Name"
  aria-invalid={errors.lastName ? "true" : "false"}
/>
{errors.lastName && (
  <p role="alert">{errors.lastName.message}</p>
)}




      {/* gender select: required */}
 
      <select className="select" {...register("gender", { required: true })} defaultValue="">
        <option value="" disabled>Choose Gender</option>
        <option value="female">female</option>
        <option value="male">male</option>
        <option value="other">other</option>
        aria-invalid={errors.lastName ? "true" : "false"}
      </select> 
      {errors.gender?.type === 'required' && (
        <p role="alert">Gender is required</p>
      )}
      
      {/* Email: required, accept only Emain structure */}
        <input
          type="email"
          placeholder="Enter your email"
          {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
          className={errors.email ? 'invalid' : ''}
        />
      
      {errors.email && <div style={{color: 'red'}} className="error">Please enter a valid email</div>}
     
     {/* Birthday input: required, accepts only age above 18. */}
      <input
         type="date"
         id="birthday"
         name="birthday"
         {...register('birthday', {
         required: true,
         validate: value => {
         const today = new Date();
         const selectedDate = new Date(value);
         const minAgeDate = new Date();
         minAgeDate.setFullYear(today.getFullYear() - 18);

      return selectedDate <= minAgeDate || 'You must be at least 18 years old';}})}
         aria-invalid={errors.birthday ? "true" : "false"}/>

         {errors.birthday && (
         <p role="alert">{errors.birthday.message}</p>)}
      

      {/* Pnone number input: accept 10 digits, country code is option */}
      <input
        type="tel"
        placeholder="Tel: 0000 00 00 000"
        {...register('phoneNumber', {
          required: 'Phone number is required',
          pattern: {
            value: /^(0090|\+90)?\d{10}$/, 
            message: 'Invalid phone number'
          }
        })}
      />
      {errors.phoneNumber && (
        <p>{errors.phoneNumber.message}</p>
      )} 

      {/* Password input: must contain at least one letter and one digit, it must be more that three and less that 20 character, accept special characters and upper/lower letters */}
      <input
        type="password"
        name="password"
        placeholder="Password"
        {...register('password', {
          required: 'This field is required',
          maxLength: {
            value: 20,
            message: 'Password cannot exceed 20 characters',
          },
          minLength: {
            value: 8,
            message: 'Password must have at least 8 characters',
          },
          pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d).+$/,
            message: 'Invalid, password must contain at least one letter and one number',
          }
        })}
      />
      {errors.password && <span >{errors.password.message}</span>}


      {/* accept terms checkbox: required */}

      <div className="acceptTerms-input">
        <input
        type="checkbox"
        id="acceptTerms"
        {...register("acceptTerms", { required: true })}/>

        <label htmlFor="acceptTerms">I accept the terms and conditions</label>
        </div>  
        {errors.acceptTerms && (
        <p role="alert">You must accept the terms and conditions</p>)}  
        
        
      {/* After submitting, it gives an alert with all data that was filled */}

      <input className="submitInput" type="submit"/>
    </form>
  );
}
