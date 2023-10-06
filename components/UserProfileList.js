import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { fetchUsersLimit, fetchAllUsers, deleteUser } from "../api/crud";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import Link from "next/link";
import { useRouter } from "next/router";
import Search from "./Search";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";

function UserProfileList() {
  const [users, setUsers] = useState([]);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;
  const router = useRouter();

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleDelete = (userId) => {
    setDeleteUserId(userId);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        if (!searchTerm) {
          // ถ้าไม่มีการค้นหา
          const allUserData = await fetchAllUsers();
          const calculatedTotalPages = Math.ceil(allUserData.length / limit);
          setTotalPages(calculatedTotalPages);
          const userData = await fetchUsersLimit({ page, limit });
          setUsers(userData);
        } else {
          // ถ้ามีการค้นหา
          const allUserData = await fetchAllUsers();
          const filteredUserData = allUserData.filter((user) => {
            const fullName = `${user.firstName} ${user.lastName}`;
            return fullName.toLowerCase().includes(searchTerm.toLowerCase());
          });
          const calculatedTotalPages = Math.ceil(
            filteredUserData.length / limit
          );
          setTotalPages(calculatedTotalPages);
          const startIndex = (page - 1) * limit;
          const endIndex = startIndex + limit;
          const slicedData = filteredUserData.slice(startIndex, endIndex);
          setSearchResults(slicedData);
        }
      } catch (error) {
        alert("ไม่สามารถดึงข้อมูลผู้ใช้ได้");
      } finally {
        setIsLoading(false); // ตั้งค่า isLoading เมื่อโหลดเสร็จ
      }
    }

    fetchData();
  }, [page, searchTerm]);

  const handleDeleteConfirm = async () => {
    try {
      await deleteUser(deleteUserId);
      const updatedUsers = users.filter((user) => user.id !== deleteUserId);
      setUsers(updatedUsers);
      setDeleteUserId(null);
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการลบผู้ใช้", error);
    }
  };

  function handleEditUser(userId) {
    router.push("/edit/[id]", `/edit/${userId}`);
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  function isValidImageUrl(url) {
    return (
      typeof url === "string" &&
      (url.startsWith("http://") || url.startsWith("https://"))
    );
  }

  const formatBirthday = (birthday) => {
    if (!birthday) {
      return "";
    }

    const options = { day: "2-digit", month: "short", year: "numeric" };
    return new Date(birthday).toLocaleDateString("en-US", options);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setPage(1); // เมื่อค้นหาใหม่ให้กลับไปหน้าแรก
  };

  const displayedUsers = searchTerm ? searchResults : users;

  return (
    <>
      {isLoading ? (
        <Backdrop open={isLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <>
          <h1>User Profile</h1>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ marginBottom: 1 }}
          >
            <Search onSearch={handleSearch} />
            <Link href={"/create"}>
              <Button
                variant="contained"
                startIcon={<PersonAddIcon />}
                sx={{ width: "130px", height: "50px" }}
              >
                Add User
              </Button>
            </Link>
          </Stack>
          <Stack direction="column" spacing={3}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">
                      Profile Image
                    </StyledTableCell>
                    <StyledTableCell align="center">First Name</StyledTableCell>
                    <StyledTableCell align="center">Last Name</StyledTableCell>
                    <StyledTableCell align="center">Gender</StyledTableCell>
                    <StyledTableCell align="center">Birthday</StyledTableCell>
                    <StyledTableCell align="center">Action</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {displayedUsers.length === 0 ? (
                    <TableRow>
                      <StyledTableCell
                        colSpan={6}
                        align="center"
                        sx={{ color: "red" }}
                      >
                        ไม่พบผู้ใช้ที่ตรงกับคำค้นหาที่คุณค้นหา
                      </StyledTableCell>
                    </TableRow>
                  ) : (
                    displayedUsers.map((row, index) => (
                      <StyledTableRow key={index}>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          align="center"
                        >
                          {isValidImageUrl(row.img) ? (
                            <img
                              src={row.img}
                              alt={`Profile of ${row.firstName}`}
                              width={50}
                              height={50}
                              style={{ borderRadius: "50%" }}
                            />
                          ) : (
                            <Image
                              src={imgPreview}
                              alt="Image Preview"
                              width={50}
                              height={50}
                              style={{ borderRadius: "50%" }}
                            />
                          )}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.firstName}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.lastName}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.gender}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {formatBirthday(row.birthday)}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Stack
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                          >
                            <Button
                              variant="contained"
                              color="success"
                              startIcon={<ModeEditOutlineIcon />}
                              onClick={() => handleEditUser(row.id)}
                            >
                              EDIT
                            </Button>
                            <Button
                              variant="contained"
                              color="error"
                              startIcon={<DeleteForeverIcon />}
                              onClick={() => handleDelete(row.id)}
                            >
                              DELETE
                            </Button>
                          </Stack>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <Pagination
              count={totalPages}
              color="primary"
              page={page}
              onChange={handlePageChange}
            />
          </Stack>
          {deleteUserId && (
            <ConfirmDeleteDialog
              isOpen={true}
              onClose={() => setDeleteUserId(null)}
              onDeleteConfirm={handleDeleteConfirm}
            />
          )}
        </>
      )}
    </>
  );
}

export default UserProfileList;
