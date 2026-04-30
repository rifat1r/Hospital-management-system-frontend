import React from "react";
import { useForm } from "react-hook-form";

const Home = () => {
  const { register, watch, handleSubmit } = useForm();

  const username = watch("username"); // watch a single field

  const onSubmit = (data) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("username")} placeholder="Username" />
      <p>Current username: {username}</p>
      <input
        {...register("time")}
        className="border border-blue-500"
        type="time"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Home;
