import 'reflect-metadata';

import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import UpdateProfileService from './UpdateProfileService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Daniel',
      email: 'emailinexistente@gobarber.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Daniel 2',
      email: 'teste@gobarber.com',
    });

    expect(updatedUser.name).toBe('Daniel 2');
    expect(updatedUser.email).toBe('teste@gobarber.com');
  });

  it('should not be able to update an inexistent profile', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existing-user-id',
        name: 'non-existing-user-name',
        email: 'non-existing-user-email',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change email to an existing email', async () => {
    await fakeUsersRepository.create({
      name: 'Daniel',
      email: 'emailinexistente@gobarber.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'test@example.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Daniel 2',
        email: 'emailinexistente@gobarber.com',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Daniel',
      email: 'emailinexistente@gobarber.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Daniel 2',
      email: 'teste@gobarber.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Daniel',
      email: 'emailinexistente@gobarber.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Daniel 2',
        email: 'teste@gobarber.com',
        password: '123123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Daniel',
      email: 'emailinexistente@gobarber.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Daniel 2',
        email: 'teste@gobarber.com',
        old_password: 'wrong-old-password',
        password: '123123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
