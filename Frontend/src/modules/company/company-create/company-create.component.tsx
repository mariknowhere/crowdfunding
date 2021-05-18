import React from 'react';
import { Button, InputAdornment, MenuItem, Snackbar, TextField } from '@material-ui/core';
import './create-company.component.scss';
import { Alert } from '@material-ui/lab';
import { appHistory } from '../../../history.utils';
import { axiosInstance } from '../../../axios.utils';
import ReactImageUploadComponent from 'react-images-upload';
import { AttachMoney } from '@material-ui/icons';

interface ICreateCompanyState {
  name: string;
  companies: ICompany[];
  description: string;
  video: string;
  amount: number;
  errors: string[];
  open: boolean;
  subject: string;
  endDate: Date;
  image: Blob;
}

interface ICompany {
  id: number;
  name: string;
  description: string;
  amount: number;
}

interface ICompanyDto {
  name: string;
  description: string;
  amount: number;
  subject: string;
  image: Blob;
  endDate: Date;
  video: string;
}

export class CompanyCreateComponent extends React.Component<object, ICreateCompanyState> {
  constructor(props: any) {
    super(props);

    this.state = {
      name: '',
      companies: [],
      description: '',
      amount: 0,
      errors: [],
      open: false,
      subject: '',
      endDate: null,
      video: '',
      image: null,
    };
  }

  createCompany = () => {
    if (!this.validate()) {
      return;
    }

    this.sendCreateCompanyRequest().then(() => appHistory.push('/personal-area/companies'));
  };

  sendCreateCompanyRequest() {
    const form = new FormData();
    const companyDto: ICompanyDto = {
      name: this.state.name,
      description: this.state.description,
      amount: this.state.amount,
      endDate: this.state.endDate,
      image: this.state.image,
      video: this.state.video,
      subject: this.state.subject,
    };
    const contentTypeHeader = { 'Content-Type': 'multipart/form-data' };

    Object.keys(companyDto).forEach(key => form.append(key, companyDto[key]));


    return axiosInstance.post<ICompany>('/company', form, { headers: contentTypeHeader });
  }

  handleCloseError = () => {
    this.setState({ errors: [] });
  };

  validate() {
    let errors = [];

    if (!this.state.name) {
      errors.push('Вы не ввели имя.');
    }
    if (!this.state.description) {
      errors.push('Вы не ввели описание.');
    }
    if (!this.state.amount) {
      errors.push('Денежная цель пуста или некорректна.');
    }
    if (!this.state.subject) {
      errors.push('Вы не выбрали тематику.');
    }
    if (!this.state.endDate) {
      errors.push('Вы не выбрали окончание проекта.');
    }
    if (!this.state.image) {
      errors.push('Вы не выбрали изображение.');
    }
    if (!this.state.video) {
      errors.push('Вы не ввели ссылку на youtube видео проекта.');
    }

    this.setState({ errors });

    return !errors.length;
  }

  get defaultDate(): string {
    return `${new Date().getFullYear()}-${new Date().getMonth().toString().padStart(2, '0')}-${new Date().getDate().toString().padStart(2, '0')}`;
  }

  render() {
    return (
      <section className="create-company">
        <h1>Создание компании</h1>
        <div className="create-company__form">
          <div className="create-company__primary">
            <TextField onChange={event => this.setState({ name: event.target.value })}
                       label="Название"
                       variant="outlined"/>
            <TextField id="outlined-multiline-static"
                       label="Описание"
                       multiline
                       rows={5}
                       defaultValue=""
                       onChange={event => this.setState({ description: event.target.value })}
                       variant="outlined"/>

            <TextField select label="Тематика"
                       onChange={event => this.setState({ subject: event.target.value })}
                       variant="outlined">
              <MenuItem value="Политика">Политика</MenuItem>
              <MenuItem value="Обучение">Обучение</MenuItem>
              <MenuItem value="Видеоигры">Видеоигры</MenuItem>
              <MenuItem value="Сервис обслуживания">Сервис обслуживания</MenuItem>
              <MenuItem value="Авто / мото">Авто / мото</MenuItem>
            </TextField>

            <TextField onChange={event => this.setState({ video: event.target.value })}
                       label="Ссылка на видео"
                       variant="outlined"/>

            <TextField onChange={event => this.setState({ amount: parseInt(event.target.value) })}
                       InputProps={{
                         startAdornment: (
                           <InputAdornment position="start">
                             <AttachMoney/>
                           </InputAdornment>
                         ),
                       }}
                       label="Денежная цель:"
                       type="number"
                       variant="outlined"/>

            <TextField label="Окончание"
                       type="date"
                       onChange={event => this.setState({ endDate: new Date(event.target.value) })}
                       defaultValue={this.defaultDate}/>
          </div>
          <div className="create-company__image-section">
            <ReactImageUploadComponent withIcon
                                       withPreview
                                       onChange={event => this.setState({ image: event[0] })}
                                       buttonText='Choose image'
                                       label="Preview image"
                                       singleImage
                                       imgExtension={['.jpg', '.png']}/>
          </div>
        </div>

        <Button onClick={this.createCompany}
                variant="contained">
          Создать
        </Button>

        <Snackbar open={!!this.state.errors.length}
                  onClose={this.handleCloseError}
                  autoHideDuration={8000}>
          <Alert severity="error">
            {this.state.errors.map(error => <div key={error}>{error}</div>)}
          </Alert>
        </Snackbar>
      </section>
    );
  }
}