import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table-6';
import { DeleteButton } from '../components/buttons';
import api from '../api';

import styled from 'styled-components';

import 'react-table-6/react-table.css';

const Wrapper = styled.div`
  padding: 0 40px 40px 40px;
`;

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exams: {},
    };
  }

  componentDidMount() {
    console.log('ExamsList: props');
    console.log(this.props);
    // if (((this.props.examData || {}).exams || []).length) return;

    this.fetchAllExams();
  }

  fetchAllExams = () => {
    api
      .getAllAdmin()
      .then(resp => {
        debugger;
        const { exams } = resp.data;
        console.log('getAllAdmin: resp');
        console.log(exams);
        this.setState({ exams });
      })
      .catch(err => {
        console.error(`ERROR in 'getAllAdmin': ${err}`);
        console.error(err);
        return err;
      });
  };

  deleteSingleItem = examId => {
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

    this.deleteSingleItem(examId).then(resp => {
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
        Header: 'ID',
        accessor: '_id',
        filterable: true,
        Cell: props => {
          return <span data-item-id={props.original._id}>{props.original._id}</span>;
        },
      },
      {
        Header: 'Patient ID',
        accessor: 'patient_Id',
        filterable: true,
        Cell: props => {
          return <span data-name={props.original.patient_Id}>{props.value}</span>;
        },
      },
      {
        Header: 'Exams',
        accessor: 'exam_Id',
        filterable: true,
        Cell: props => {
          return <span data-name={props.original.exam_Id}>{props.value}</span>;
        },
      },
      // {
      //   Header: 'Timeframe',
      //   accessor: 'timeframeNote',
      //   Cell: props => {
      //     return <span data-timeframe={props.original.timeframeNote}>{props.value || '-'}</span>;
      //   },
      // },
      // {
      //   Header: 'Priority',
      //   accessor: 'priority',
      //   filterable: true,
      //   Cell: props => {
      //     return <span data-priority={props.original.priority}>{props.value}</span>;
      //   },
      // },
      {
        Header: '',
        accessor: '',
        Cell: props => {
          return (
            <Link data-update-id={props.original._id} to={`/exam/update/${props.original._id}`}>
              Update Exam
            </Link>
          );
        },
      },
      {
        Header: '',
        accessor: '',
        Cell: props => {
          return (
            <span data-delete-id={props.original._id}>
              <DeleteButton id={props.original._id} onDelete={this.handleRemoveExam} />
            </span>
          );
        },
      },
    ];

    return (
      <Wrapper>
        {(exams || []).length > 0 ? ( // defeats the purpose of using `isLoading` prop?
          <ReactTable
            data={exams}
            columns={columns}
            defaultPageSize={10}
            showPageSizeOptions={true}
            minRows={10}
          />
        ) : (
          `No exams to render... :(`
        )}
      </Wrapper>
    );
  }
}

export default Admin;