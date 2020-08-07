import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import ShowProfileService from './ShowProfileService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Daniel',
      email: 'teste@gobarber.com',
      password: '123456',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('Daniel');
    expect(profile.email).toBe('teste@gobarber.com');
  });

  it('should not be able to show an inexistent profile', async () => {
    await expect(
      showProfile.execute({
        user_id: 'non-existing-user-id',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
