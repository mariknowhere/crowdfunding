import { Component } from 'react';
import { Avatar, Card, CardContent, CardHeader, IconButton } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { IDonation } from './company-card/company-card.component';

export class DonationsComponent extends Component<{ donation: IDonation }, any> {
  render() {
    return (
      <Card>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe">
              R
            </Avatar>
          }
          title={this.props.donation.from.name}
          subheader={new Date(this.props.donation.createdAt).toLocaleDateString()}
        />
        <CardContent>
          {this.props.donation.amount} $
        </CardContent>
      </Card>
    );
  }
}