function message({
  message,
  sender,
  user,
}: {
  message: string;
  sender: string;
  user: string;
}) {
  return (
    <>
    {sender===user?
      <div className="w-full float-left">
        <div className="float-right mr-5 rounded-bl-3xl rounded-t-3xl w-fit h-fit p-3 bg-[#283e5e] mb-1 text-[#ffffffda] font-medium text-sm  font-roboto-condensed max-w-md ">
          <h1 className="" style={{ lineBreak: "anywhere" }}>
            {message}
          </h1>
        </div>
      </div>:
      <div className="w-full float-left">
      <div className=" ml-5 rounded-tr-3xl rounded-b-3xl w-fit h-fit p-3 bg-[#acc0c12e] mb-1 text-[black] font-medium text-sm  font-roboto-condensed max-w-md ">
        <h1 className="" style={{ lineBreak: "anywhere" }}>
          {message}
        </h1>
      </div>
    </div>
    }
    </>
  );
}

export default message;
