import React from 'react';
import { Button, Snackbar, TextField } from '@material-ui/core';
import ReactImageUploadComponent from 'react-images-upload';
import { Alert } from '@material-ui/lab';
import { axiosInstance } from '../../../axios.utils';
import { appHistory } from '../../../history.utils';
import './news-create.component.scss';

export interface INewsRecord {
  readonly title: string;
  readonly image: string;
  readonly content: string;
  readonly createdAt: string
  readonly id: number;
}

interface INewsCreateState {
  readonly title: string;
  readonly image: Blob;
  readonly content: string;
  readonly errors: string[]
}

export class NewsCreateComponent extends React.Component<any, INewsCreateState> {
  state: INewsCreateState = {
    errors: [],
    content: '',
    title: '',
    image: null,
  };

  validate() {
    let errors = [];

    if (!this.state.title) {
      errors.push('Вы не ввели имя.');
    }
    if (!this.state.content) {
      errors.push('Вы не ввели контент статьи.');
    }
    if (!this.state.image) {
      errors.push('Вы не выбрали изображение.');
    }

    this.setState({ errors });

    return !errors.length;
  }

  get companyId(): string {
    return this.props.match.params.id;
  }

  createRecord = (): void => {
    if (!this.validate()) {
      return;
    }

    const form = new FormData();

    form.append('content', this.state.content);
    form.append('title', this.state.title);
    form.append('image', this.state.image);

    axiosInstance.post(`/news/${this.companyId}`, form)
      .then(() => appHistory.push(`/company/${this.companyId}/news`));
  };

  render() {
    return (
      <div className="news-create__container">
        <div className="news-create">
          <h1>Создать новость</h1>
          <div>
            <ReactImageUploadComponent withIcon
                                       withPreview
                                       onChange={event => this.setState({ image: event[0] })}
                                       buttonText='Выберите изображение'
                                       label="Превью"
                                       singleImage
                                       imgExtension={['.jpg', '.png']}/>
          </div>

          <TextField onChange={event => this.setState({ title: event.target.value })}
                     label="Заголовок"/>

          <TextField multiline
                     variant="outlined"
                     rows={10}
                     onChange={event => this.setState({ content: event.target.value })}
                     label="Контент"/>

          <Snackbar open={!!this.state.errors.length}
                    onClose={() => this.setState({ errors: [] })}
                    autoHideDuration={8000}>
            <Alert severity="error">
              {this.state.errors.map(error => <div key={error}>{error}</div>)}
            </Alert>
          </Snackbar>

          <Button variant="outlined" onClick={this.createRecord}>Опубликовать</Button>

        </div>
      </div>
    );
  }
}
