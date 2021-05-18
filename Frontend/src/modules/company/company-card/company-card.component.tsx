import React from 'react';
import {
  Avatar, Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton, LinearProgress,
  Typography,
} from '@material-ui/core';
import './company-card.component.scss';
import { Delete, OpenInNew } from '@material-ui/icons';
import { If } from '../../If';
import { getUser, isLogged } from '../../../login.utils';
import { IUser } from '../../account/Register';
import { Link } from 'react-router-dom';
import { INewsRecord } from '../news-create/news-create.component';

export interface IDonation {
  readonly id: number;
  readonly from: IUser;
  readonly amount: number;
  readonly createdAt: number;
}

export const getTotalAmount = (company: ICompany): number => {
  return company.donations.map(d => d.amount)
    .reduce((acc, current) => acc + current, 0);
};

export interface ICompany {
  readonly id: number;
  readonly name: string;
  readonly description: string;
  readonly amount: number;
  readonly currentAmount: number;
  readonly subject: string;
  readonly userId: number;
  readonly image: string;
  readonly video: string;
  readonly createdAt: string;
  readonly endDate: string;
  readonly user: IUser;
  readonly donations: IDonation[];
  readonly news: INewsRecord[];
}

interface ICompanyProps {
  readonly company: ICompany;
  readonly onDelete?: (company: ICompany) => any,
}

export class CompanyCardComponent extends React.Component<ICompanyProps> {
  constructor(props: ICompanyProps) {
    super(props);
  }

  get current(): number {
    return getTotalAmount(this.props.company);
  }
  
  get progress(): number {
    return ( this.current / this.props.company.amount) * 100;
  }

  render() {
    return (
      <Card className="company-card">
        <CardHeader
          avatar={
            <Avatar aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <Link to={`/company/${this.props.company.id}`}>
              <IconButton aria-label="open company">
                <OpenInNew/>
              </IconButton>
            </Link>
          }
          title={this.props.company.user.name}
          subheader={this.props.company.subject}
        />
        <CardMedia
          image={this.props.company.image}
          title={this.props.company.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {this.props.company.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {this.props.company.description}
          </Typography>

          <Box display="flex" alignItems="center">
            <Box width="100%" mr={1}>
              <LinearProgress value={this.progress} variant="determinate"/>
            </Box>
            <Box>
              <Typography noWrap variant="body2" color="textSecondary">
                {`${this.current} / ${this.props.company.amount}$`}
              </Typography>
            </Box>
          </Box>
        </CardContent>
        <CardActions>
          <div className="spacer"/>
          <If if={isLogged() && getUser().id == this.props.company.userId}>
            <IconButton aria-label="detele"
                        onClick={() => this.props.onDelete && this.props.onDelete(this.props.company)}>
              <Delete/>
            </IconButton>
          </If>
        </CardActions>
      </Card>
    );
  }
}
