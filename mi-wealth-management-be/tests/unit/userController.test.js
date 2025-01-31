const { getUsers } = require('../../src/controllers/userController');

describe('User Controller', () => {
  it('should return all users', () => {
    const req = {};
    const res = {
      json: jest.fn(),
    };

    getUsers(req, res);
    expect(res.json).toHaveBeenCalledWith({ message: 'Get all users' });
  });
});