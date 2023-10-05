import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import userPreview from "../public/images/user-preview.png";
import Image from "next/image";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import getConfig from "next/config";
import Link from "next/link";

function Form({ userData, setUserData, saveUserData }) {
  const defaultImageProfile = userPreview;
  const [uploadImage, setUploadImage] = useState(defaultImageProfile);
  const { publicRuntimeConfig } = getConfig();

  const apiKey = publicRuntimeConfig.API_KEY;

  console.log("gender " + userData.gender);
  console.log("birthday " + userData.birthday);

  const handleChange = (event) => {
    const { name, value } = event.target;

    // อัปเดตค่าใน userData ตามชื่อฟิลด์
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleDeleteImage = () => {
    setUploadImage(userPreview); // กำหนดให้รูปภาพเป็น userPreview
    setUserData((prevUserData) => ({
      ...prevUserData,
      img: "", // ยกเลิกรูปภาพใน userData โดยกำหนดเป็นข้อความว่าง
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("image", file);

        // ใช้ Axios เพื่ออัปโหลดรูปภาพไปยัง ImgBB
        const response = await axios.post(
          `https://api.imgbb.com/1/upload?key=${apiKey}`,
          formData
        );

        if (response.status === 200) {
          const imageUrl = response.data.data.url;
          console.log(imageUrl);
          setUploadImage(imageUrl);

          // แทนที่ URL รูปภาพใน userData
          setUserData((prevUserData) => ({
            ...prevUserData,
            img: imageUrl,
          }));
        } else {
          console.error("Failed to upload image to ImgBB:", response.data);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  };

  // create
  const handleSave = () => {
    const userDataToSave = {
      img: uploadImage,
      firstName: userData.firstName,
      lastName: userData.lastName,
      gender: userData.gender, 
      birthday: userData.birthday,
    };
    saveUserData(userDataToSave);
  };

  return (
    <Stack spacing={2} sx={{ marginTop: 2 }}>
      <Box component="form" noValidate autoComplete="off">
        <Stack
          direction="row"
          spacing={2}
          sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
        >
          {/* รูป */}
          <Stack spacing={2} alignItems="center" sx={{ marginBottom: "20px" }}>
            {userData.img ? (
              <img
                src={userData.img}
                alt="User Preview"
                width={150}
                height={150}
                style={{ borderRadius: "50%" }}
              />
            ) : (
              uploadImage && (
                <Image
                  src={uploadImage}
                  alt="Preview"
                  width={150}
                  height={150}
                  style={{ borderRadius: "50%" }}
                />
              )
            )}

            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </Button>
            <Button
              variant="outlined"
              onClick={handleDeleteImage}
              color="error"
            >
              Delete Picture
            </Button>
          </Stack>

          <Stack justifyContent="center" id="box-form">
            {/* ฟอร์ม */}
            <Stack direction="row" className="input-text">
              <TextField
                id="outlined-basic"
                label="First Name"
                variant="outlined"
                sx={{ width: 220 }}
                className="text-f-field"
                name="firstName"
                value={userData.firstName}
                onChange={handleChange}
              />
              <TextField
                id="outlined-basic"
                label="Last Name"
                variant="outlined"
                sx={{ width: 220 }}
                className="text-field"
                name="lastName"
                value={userData.lastName}
                onChange={handleChange}
              />
            </Stack>
            <Stack direction="row" className="input-text">
              <FormControl sx={{ width: 220 }} className="text-g-field">
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Gender"
                  name="gender"
                  value={userData.gender}
                  onChange={handleChange}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="non-binary">Non-Binary</MenuItem>
                </Select>
              </FormControl>
              <input
                type="date"
                id="birthday"
                name="birthday"
                value={userData.birthday || ""}
                onChange={handleChange}
                required
              />
            </Stack>
          </Stack>
        </Stack>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          sx={{ marginTop: 5 }}
          id="btn-form"
        >
          <Button variant="contained" color="success" onClick={handleSave}>
            SAVE
          </Button>
          <Link href={"/"}>
            <Button variant="contained" sx={{ backgroundColor: "gray" }}>
              CANCEL
            </Button>
          </Link>
        </Stack>
      </Box>
    </Stack>
  );
}

export default Form;
