import { TabItem, Tabs } from "flowbite-react";
import UserTable from "../../../../Components/Admin/UserTable/UserTable";
import { useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useRef } from "react";

const AllUsers = () => {
  const allUserMap = useMemo(
    () => ({
      admin: "All Admins",
      doctor: "All Doctors",
      patient: "All Patients",
    }),
    []
  );
  let [searchParams, setSearchParams] = useSearchParams();
  const userType = searchParams.get("userType");
  const tabsRef = useRef(null);

  const validUserTypes = Object.keys(allUserMap);

  const handleQueryParams = (tabIndex) => {
    setSearchParams({ userType: validUserTypes[tabIndex] });
  };

  useEffect(() => {
    if (!userType || !validUserTypes.includes(userType)) {
      setSearchParams({ userType: validUserTypes[0] });
      console.log("its here");
    }
  }, [userType, validUserTypes, setSearchParams]);

  // TODO: handle active tab after page reloads

  return (
    <div>
      <Tabs
        ref={tabsRef}
        onActiveTabChange={(tabIndex) => handleQueryParams(tabIndex)}
      >
        {Object.values(allUserMap).map((title) => (
          <TabItem title={title} key={title}>
            <UserTable userType={userType} />
          </TabItem>
        ))}
      </Tabs>
    </div>
  );
};

export default AllUsers;
