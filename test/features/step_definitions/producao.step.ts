import { Before, Then, When } from '@cucumber/cucumber';
import { AppModule } from '../../../src/app.module';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import * as assert from 'assert';

interface Context {
  app: any;
  response: request.Response;
}

Before(async function (this: Context) {
  const module = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  this.app = module.createNestApplication();
  await this.app.init();
});

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

Then(
  'a mensagem de retorno é {string}',
  function (this: Context, mensagem: string) {
    const resp = JSON.parse(this.response.text);
    assert.equal(resp.message, mensagem);
  },
);

Then('status do retorno é {string}', function (this: Context, status: string) {
  assert.equal(this.response.status, status);
});
