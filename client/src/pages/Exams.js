import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { useTable } from 'react-table';
import { DeleteButton } from '../components/buttons';
import api from '../api';

import MaUTable from '@material-ui/core/Table';
import { CssBaseline, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 0 40px 40px 40px;

  @media screen and (max-width: 420px) {
    padding-left: 0.5em;
    padding-right: 0.5em;
  }
`;


const Table = ({ columns, data }) => {
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <MaUTable {...getTableProps()}>
      <TableHead>
        {headerGroups.map(headerGroup => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <TableCell {...column.getHeaderProps()}>
                {column.render('Header')}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <TableRow data-row-exam-id={row.values._id} {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <TableCell {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </MaUTable>
  );
};

class Exams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exams: {},
    };
  }

  componentDidMount() {
    console.log('ExamsList: props');
    console.log(this.props);

    this.fetchAllExams();
  }

  fetchAllExams = () => {
    api
      .getAllExams()
      .then(resp => {
        const { exams } = resp.data;
        console.log('getAllExams: resp');
        console.log(exams);
        this.setState({ exams });
      })
      .catch(err => {
        console.error(`ERROR in 'getAllExams': ${err}`);
        console.error(err);
        return err;
      });
  };

  deleteSingleExam = examId => {
    return api
      .deleteExamById(examId)
      .then(resp => {
        console.log('deleteExamById: resp');
        console.log(resp);
        return resp;
      })
      .catch(err => {
        console.error(`ERROR in 'deleteSingleExam': ${err}`);
        console.error(err);
        return err;
      });
  };

  handleRemoveExam = data => {
    const examId = data;

    this.deleteSingleExam(examId).then(resp => {
      console.log('handleRemoveExam: resp');
      console.log(resp);
      this.fetchAllExams();
    });
  };

  render() {
    const exams = this.state.exams || {};
    console.log(exams);

    const columns = [
      {
        Header: 'Patient ID',
        accessor: 'patient_Id',
        // filterable: true,
        Cell: props => {
          console.log(props);
          const { original } = props.cell.row;
          return <span data-exam-id={original.patient_Id}>{props.value}</span>;
        },
      },
      {
        Header: 'Exam',
        accessor: 'exam_Id',
        // filterable: true,
        Cell: props => {
          const { original } = props.cell.row;
          return <span data-name={original.exam_Id}>{props.value}</span>;
        },
      },
      {
      Header: 'Image',
      accessor: 'png_filename',
      // filterable: true,
      Cell: props => {
          const imgUrl= `https://ohif-hack-diversity-covid.s3.amazonaws.com/covid-png/`
          const { original } = props.cell.row;
          //const imageUrl = () => `https://ohif-hack-diversity-covid.s3.amazonaws.com/covid-png/${png_filename}`;
          return <img data-name={original.png_filename} style={{width: 60, borderRadius: 40/ 2}} src={imgUrl+props.value} />
        },
      },
      {
      Header: 'Key Findings',
      accessor: 'key_findings',
      Cell: props => {
          const { original } = props.cell.row;
          return <span data-timeframe={original.key_findings}>{props.value || '-'}</span>;
        },
      },
      /*{
        Header: 'Priority',
        accessor: 'priority',
        // filterable: true,
        Cell: props => {
          const { original } = props.cell.row;
          return <span data-priority={original.priority}>{props.value}</span>;
        },
      },*/
      {
        Header: 'Update',
        accessor: '_update',
        Cell: props => {
          const { original } = props.cell.row;

          return (
            <Link data-update-id={original._id} to={`/exam/update/${original._id}`}>
              Update
            </Link>
          );
        },
      },
      {
        Header: 'Delete',
        accessor: '_delete',
        Cell: props => {
          const { original } = props.cell.row;
          return (
            <span data-delete-id={original._id}>
              <DeleteButton id={original._id} onDelete={this.handleRemoveExam} />
            </span>
          );
        },
      },
    ];

    return (
      <Wrapper>
        <CssBaseline />
        {(exams || []).length > 0 ? (
          <Table data={exams} columns={columns} />
        ) : (
          `No exams to render... :(`
        )}
      </Wrapper>
    );
  }
}

export default Exams;
