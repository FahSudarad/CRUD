import React, { useEffect } from "react";
import { updateUser, fetchUserDataById } from "../../api/crud";
import { useRouter } from "next/router";
import Form from "@/components/Form";
import Header from "@/components/Header";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

function edit() {
  const router = useRouter();
  const { id } = router.query;

  // สร้าง state สำหรับเก็บข้อมูลผู้ใช้ในหน้า edit
  const [userData, setUserData] = React.useState({
    img: "", 
    firstName: "",
    lastName: "",
    gender: "",
    birthday: null, 
  });

  useEffect(() => {
    if (id) {
      // ดึงข้อมูลผู้ใช้ที่ต้องการแก้ไขจาก API
      fetchUserDataById(id)
        .then((user) => {
          setUserData({
            ...user,
            gender: user.gender.toLowerCase(), // แปลงเป็นตัวพิมพ์เล็ก
          });
        })
        .catch((error) => {
          console.error("เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้", error);
        });
    }
  }, [id]);

  // สร้างฟังก์ชัน saveUserData สำหรับการบันทึกข้อมูลผู้ใช้
  const saveUserData = async () => {
    try {
      // เรียกใช้งาน updateUser จาก API เพื่ออัปเดตผู้ใช้
      const updatedUser = await updateUser(id, userData);
      console.log("ผู้ใช้ถูกอัปเดต:", updatedUser);
      router.push("/");
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการอัปเดตผู้ใช้", error);
    }
  };

  return (
    <>
      <nav>
        <Header />
      </nav>
      <section>
        <Container
          fixed
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1 id="create-h1">Edit User</h1>
          <Card sx={{ minWidth: 275, width: "80%" }}>
            <CardContent>
              <Form
                userData={userData}
                setUserData={setUserData}
                saveUserData={saveUserData}
              />
            </CardContent>
          </Card>
        </Container>
      </section>
    </>
  );
}

export default edit;
