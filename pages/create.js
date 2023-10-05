import React, { useState } from "react";
import { createUser } from "../api/crud";
import { useRouter } from "next/router";
import Form from "@/components/Form";
import Header from "@/components/Header";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

function Create() {
  // สร้าง state สำหรับเก็บข้อมูลผู้ใช้ในหน้า create
  const [userData, setUserData] = React.useState({
    img: "",
    firstName: "",
    lastName: "",
    gender: "",
    birthday: null, 
  });
  const router = useRouter();

  const saveUserData = async () => {
    try {
      // เช็คว่าข้อมูลที่ผู้ใช้ป้อนไม่มีช่องว่างหรือว่างเปล่า
      if (
        userData.img.trim() === "" ||
        userData.firstName.trim() === "" ||
        userData.lastName.trim() === "" ||
        userData.gender.trim() === "" ||
        userData.birthday === null
      ) {
        alert("กรุณากรอกข้อมูลให้ครบทุกช่อง");
        return; // หยุดการทำงานทันทีถ้าข้อมูลไม่ถูกต้อง
      }

      // เรียกใช้งาน createUser จาก API เพื่อสร้างผู้ใช้ใหม่
      const createdUser = await createUser(userData);
      console.log("ผู้ใช้ถูกสร้าง:", createdUser);
      router.push("/");
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการสร้างผู้ใช้", error);
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
          <h1 id="create-h1">Create User</h1>
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

export default Create;
