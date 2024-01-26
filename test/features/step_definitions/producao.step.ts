import { Before, Given, Then, When } from '@cucumber/cucumber';
import { AppModule } from '../../../src/app.module';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import * as assert from 'assert';

function dataTableToJson(cabecalho: string[], linha: string[]): any {
  let dado = '';
  for (let j = 0; j < linha.length; j++) {
    if (dado !== '') {
      dado += ',';
    }
    dado += `"${cabecalho[j]}":"${linha[j]}"`;
  }
  return JSON.parse(`{${dado}}`);
}

interface Context {
  app: any;
  response: request.Response;
  body: string;
}

Before(async function (this: Context) {
  const module = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  this.app = module.createNestApplication();
  await this.app.init();
});

//consultar status
When(
  'é enviado o nome do status incorreto do {string}',
  async function (this: Context, rota: string) {
    this.response = await request(this.app.getHttpServer()).get(rota);
  },
);

When(
  'é enviado vazio no nome do status do {string}',
  async function (this: Context, rota: string) {
    this.response = await request(this.app.getHttpServer()).get(rota);
  },
);

When(
  'é enviado para GET {string}',
  async function (this: Context, rota: string) {
    this.response = await request(this.app.getHttpServer()).get(rota);
  },
);

Then('status do retorno é {string}', function (this: Context, status: string) {
  assert.equal(this.response.status, status);
});

//atualizar status
Given('os dados {string}', function (this: Context, body: string) {
  this.body = JSON.parse(body);
});

When(
  'é enviado para {string}',
  async function (this: Context, rota: string) {
    this.response = await request(this.app.getHttpServer()).patch(rota)
      .send(this.body)
      .set('Accept', 'application/json');
  },
);

Then('a mensagem de retorno é {string}', function (this: Context, mensagem: string) {
  if (mensagem === '') {
    assert.equal(this.response?.text, '');
  }
  else {
    const resp = JSON.parse(this.response.text);
    if (mensagem === "") {
      assert.equal(resp.message, undefined);
    } else {
      assert.equal(resp.message, mensagem);
    }
  }
});

Then('json com {string} {} é retornado se status {int}', function (this: Context, campo: string, valor: any, status: number) {
  if (this.response.status === status) {
    const resp = JSON.parse(this.response.text);
    assert.equal(resp[campo], valor);
  }
});

Then('a quantidade de registros retornados é {}', function (this: Context, qtd: number) {
  const resp = JSON.parse(this.response.text);
  const retorno = resp.length ? resp.length : 0;
  assert.equal(retorno, qtd);
});

When('é criado um novo registro para {string}', async function (this: Context, rota: string) {
  this.response = await request(this.app.getHttpServer()).post(rota)
    .send(this.body)
    .set('Accept', 'application/json');
});