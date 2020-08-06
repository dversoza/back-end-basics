import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUsersTokenRepository from '../repositories/fakes/FakeUsersTokenRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUsersTokenRepository: FakeUsersTokenRepository;
let fakeMailProvider: FakeMailProvider;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUsersTokenRepository = new FakeUsersTokenRepository();
    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUsersTokenRepository
    );
  });

  it('should be able to recover its password informing its email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'Fulano',
      email: 'fulano@detal.com.br',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'fulano@detal.com.br',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover password with a non-existing email', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'fulano@detal.com.br',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUsersTokenRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'Fulano',
      email: 'fulano@detal.com.br',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'fulano@detal.com.br',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
