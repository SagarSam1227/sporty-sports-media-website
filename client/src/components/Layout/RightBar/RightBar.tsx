import UserDetails from "../../UserDetails/UserDetails";

function RightBar() {
  return (
    <>
      <div className="md:w-[47%] hidden md:block md:h-full">
        <UserDetails />
      </div>
    </>
  );
}

export default RightBar;
