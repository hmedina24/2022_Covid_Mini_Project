import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import api from '../api';

import { routes } from '../constants';

import { Button } from '@material-ui/core';
import styled from 'styled-components';

import { ItemsList, ItemsPlain, ItemsTable } from '../pages';

const LinksGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr [col-start]);
  margin-bottom: 1em;
  min-height: 30px;
  padding: 1em;
  width: 100%;
`;

const LinkGridWrapper = styled.div``;

const isCurrentPage = linkPathname => {
  return window.location.pathname === linkPathname;
};

const linkTextColor = linkPathname => {
  return isCurrentPage(linkPathname) ? '#FFFFFF' : 'rgba(255,255,255,.75)';
};


class Exams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exams: {}
    };
  }
  componentDidMount() {
    console.log('ExamList: props');
    console.log(this.props);

    this.fetchAllExams();
  }
  fetchAllExams = () => {
    api
      .getAllExams()
      .then(resp => {
        debugger;
        const {exams}  = resp.data;
        console.log('getAllExams: resp');
        console.log(exams);
        this.setState({exams});
      })
      .catch(err => {
        console.error(`ERROR in 'getAllItems':${err}`);
        console.log(err);
        return err;
      });
  };

  deleteSingleExam = examId => {
    return api
    .deleteItemById(examId)
    .then(resp => {
      console.log('deleteExamById: resp');
      //console.log(err);
      //return err;
    });
  };

  handleRemoveExam = data => {
    const examId = data

    this.deleteSingleExam(examId).then(resp => {
      console.log('handleRemoveExam: resp');
      console.log(resp);
      this.fetchAllExams();
    });
  };

  render() {
    const exams = this.state.items || {};
    console.log(exams);
    const columns = [
      {
        Header: 'Patient ID',
        accessor: 'PATIENT_ID',
        filterable: true,
        cell: props => {
          return <span data-exam-id={props.original._id}>{props.original._id}</span>;
        },
      },
      {
        Header: 'Exam ID',
        accessor: 'EXAM_ID',
        filterable: true,
        cell: props => {
          return <span data-exam-id={props.original._id}>{props.original._id}</span>;
        },
      },
      {
        Header: 'Image',
        accessor: '_id',
        filterable: true,
        cell: props => {
          return <span data-exam-id={props.original._id}>{props.original._id}</span>;
        },
      },
      {
        Header: 'Key Findings',
        accessor: '_id',
        filterable: true,
        cell: props => {
          return <span data-exam-id={props.original._id}>{props.original._id}</span>;
        },
      },
      {
        Header: 'Brixia Score',
        accessor: '_id',
        filterable: true,
        cell: props => {
          return <span data-exam-id={props.original._id}>{props.original._id}</span>;
        },
      },
      {
        Header: 'Age',
        accessor: 'AGE',
        filterable: true,
        cell: props => {
          return <span data-exam-id={props.original._id}>{props.original._id}</span>;
        },
      },
      {
        Header: 'Sex',
        accessor: 'SEX',
        filterable: true,
        cell: props => {
          return <span data-exam-id={props.original._id}>{props.original._id}</span>;
        },
      },
      {
        Header: 'Race',
        accessor: 'RACE',
        filterable: true,
        cell: props => {
          return <span data-exam-id={props.original._id}>{props.original._id}</span>;
        },
      },
      {
        Header: 'ZIP',
        accessor: 'ZIP',
        filterable: true,
        cell: props => {
          return <span data-exam-id={props.original._id}>{props.original._id}</span>;
        },
      },
      
    ]
    return (
      <>
      <p>Hello World!</p>
      </>
    );
  }
}

export default Exams;

