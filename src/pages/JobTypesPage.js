import { Box, Button, Paper, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import JobTypeRow from "../components/jobType/JobTypeRow";
import { SERVER_URL } from "../constants/http";
import { UserContext } from "../store/userContext";
import EditJobType from "../components/jobType/EditJobType";
import myTheme from "../theme";
import { getAllJobTypes } from "../util/http/jobTypes";

function JobTypesPage() {
  const [jobTypes, setJobTypes] = useState([]);
  const [editingJobType, setEditingJobType] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const userCtx = useContext(UserContext);

  useEffect(() => {
    async function getJT() {
      setJobTypes(await getAllJobTypes(userCtx.token))
    }
    getJT();
  }, []);

  async function onSubmit(jobType) {
    console.log(jobType);
    const data = await fetch(SERVER_URL + '/jobTypes', {
      method: jobType.id ? 'PUT' : 'POST',
      headers: {
        "x-auth-token": userCtx.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobType)
    });
    if (data.status < 300) {
      const json = await data.json();
      setJobTypes([json.jobType, ...jobTypes]);
    }
  }

  async function onEdit(jobType) {
    console.log(jobType);
    const data = await fetch(SERVER_URL + `/jobTypes/${jobType.id}`, {
      method: jobType.id ? 'PUT' : 'POST',
      headers: {
        "x-auth-token": userCtx.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobType)
    });
    if (data.status < 300) {
      const json = await data.json();
      const jobType = json.jobType;
      setJobTypes([jobType, ...jobTypes.filter(j => j.id !== jobType.id)]);
    }
  }

  async function deletJobType(id) {
    const data = await fetch(`${SERVER_URL}/jobTypes/${id}`, {
      method: 'DELETE',
      headers: {
        "x-auth-token": userCtx.token
      }
    });
    return data.status < 300;
  }

  const handleAddJobType = () => {
    setEditingJobType(null);
    setIsDialogOpen(true);
  };

  const handleEditJobType = (jobType) => {
    setEditingJobType(jobType);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingJobType(null);
  };

  return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4, color: myTheme.palette.primary.main, flex: 1 }}>
        <Typography variant="h4" sx={{ mb: 2, color: myTheme.palette.primary.main }}>All jobs</Typography>
        <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={handleAddJobType}>Add new</Button>
        <EditJobType
            jobType={editingJobType}
            onConfirmed={(jt) => {
              if (!jt.id) onSubmit(jt);
              else onEdit(jt);
              handleCloseDialog();
            }}
            open={isDialogOpen}
            onClose={handleCloseDialog}
        />
        <TableContainer component={Paper} sx={{ maxWidth: '50%' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ width: '100%' }}>
                <TableCell>Title</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            {jobTypes && jobTypes.map(jt => (
              <JobTypeRow
                  onDelete={async () => {
                    if (await deletJobType(jt.id)) {
                      setJobTypes(jobTypes.filter(j => j.id !== jt.id));
                    }
                  }}
                  onEdit={() => handleEditJobType(jt)}
                  key={jt.id}
                  jobType={jt}
              />
            ))}
          </Table>
        </TableContainer>
      </Box>
  );
}

export default JobTypesPage;
