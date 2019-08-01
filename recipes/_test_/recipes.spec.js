const server = require('../../server');
const db = require('../../database/dbConfig');
const request = require('supertest');
let token;

beforeAll(async () => {
  const user = {
    firstname: 'kelechi',
    lastname: 'ogbonna',
    username: 'kayss',
    email: 'kellsy1@example.com',
    password: '1234',
    confirmPassword: '1234'
  };
  return request(server)
    .post('/api/auth/register')
    .send(user);
});

describe('Recipes', () => {
  beforeAll(async () => {
    await db('recipes').truncate();
  });

  it('should get token', () => {
    return request(server)
      .post('/api/auth/login')
      .send({
        usernameoremail: 'kellsy1@example.com',
        password: '1234'
      })
      .then(res => {
        token = res.body.token;
      });
  });

  describe('Get Recipes', () => {
    it('returns a 404 if there is no recipe', async () => {
      return request(server)
        .get('/api/recipes')
        .set('authorization', token)
        .expect(404)
        .then(res => {
          expect(res.status).toEqual(404);
          expect(res.body).toEqual('No recipe has been created yet');
        });
    });
  });

  describe('Add Recipes', () => {
    it('it adds a recipe to the database', () => {
      const recipe = {
        title: 'beans porridge 2',
        description:
          'porridge beans is also known as jellof beans to some people in this country',
        ingredients: 'beans, crayfish, palmoil, plantain, pepper, salt, maggi',
        directions: `wash beans thouroughly and boil till half soft,
                        add plantain and continue to boil till soft,
                        then and maggi crayfish all the rest, when soft, add palmoil,
                         boil for 5 more minutes and food is ready to be served`
      };
      return request(server)
        .post('/api/recipes')
        .send(recipe)
        .set('authorization', token)
        .expect(201)
        .then(res => {
          expect(res.status).toEqual(201);
          expect(res.body).toHaveProperty('message');
          expect(res.body).toHaveProperty('recipe');
          expect(res.body.recipe).toBeInstanceOf(Object);
        });
    });
  });

  describe('Get recipes', () => {
    it('returns an array of recipes', () => {
      return request(server)
        .get('/api/recipes')
        .set('authorization', token)
        .expect(200)
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.data).toBeInstanceOf(Array);
        });
    });
  });

  describe('Get recipes by id ', () => {
    it('returns a recipe object', () => {
      return request(server)
        .get('/api/recipes/1')
        .set('authorization', token)
        .expect(200)
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.data).toHaveProperty('id');
          expect(res.body.data).toHaveProperty('recipe_image');
          expect(res.body.data).toHaveProperty('title');
          expect(res.body.data).toHaveProperty('description');
          expect(res.body.data).toHaveProperty('user_id');
          expect(res.body.data).toHaveProperty('Notes');
          expect(res.body.data).toHaveProperty('bio');
          expect(res.body.data).toHaveProperty('source_image');
        });
    });
    it('returns a 404 if the recipe is not found', () => {
      return request(server)
        .get('/api/recipes/9')
        .set('authorization', token)
        .expect(404)
        .then(res => {
          expect(res.status).toEqual(404);
          expect(res.body).toEqual('could not find this recipe');
        });
    });
  });

  describe('Update a recipe', () => {
    it('it updates a recipe and returns the updated recipe', () => {
      const recipe = {
        title: 'beans porridge gelatios',
        description:
          'porridge beans is also known as jellof beans to some people in this country, I have no idea what gelatio is',
        ingredients: 'beans, crayfish, palmoil, plantain, pepper, salt, maggi',
        directions: `wash beans thouroughly and boil till half soft,
                        add plantain and continue to boil till soft,
                        then and maggi crayfish all the rest, when soft, add palmoil,
                         boil for 5 more minutes and food is ready to be served`
      };
      return request(server)
        .put('/api/recipes/1')
        .send(recipe)
        .set('authorization', token)
        .expect(200)
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body).toHaveProperty('message');
          expect(res.body).toHaveProperty('data');
          expect(res.body.message).toEqual('recipe has been updated');
          expect(res.body.data).toBeInstanceOf(Object);
        });
    });
    it('returns a 404 if the recipe is not found', () => {
      const recipe = {
        title: 'beans porridge gelatios',
        description:
          'porridge beans is also known as jellof beans to some people in this country, I have no idea what gelatio is',
        ingredients: 'beans, crayfish, palmoil, plantain, pepper, salt, maggi',
        directions: `wash beans thouroughly and boil till half soft,
                            add plantain and continue to boil till soft,
                            then and maggi crayfish all the rest, when soft, add palmoil,
                             boil for 5 more minutes and food is ready to be served`
      };
      return request(server)
        .put('/api/recipes/9')
        .send(recipe)
        .set('authorization', token)
        .expect(404)
        .then(res => {
          expect(res.status).toEqual(404);
          expect(res.body).toEqual('could not find this recipe');
        });
    });
    it('returns a 400 if the data input is incomplete', () => {
      const recipe = {
        title: '',
        description:
          'porridge beans is also known as jellof beans to some people in this country, I have no idea what gelatio is',
        ingredients: 'beans, crayfish, palmoil, plantain, pepper, salt, maggi',
        directions: ''
      };
      return request(server)
        .put('/api/recipes/1')
        .send(recipe)
        .set('authorization', token)
        .expect(400)
        .then(res => {
          expect(res.status).toEqual(400);
          expect(res.body).toHaveProperty('error');
        });
    });
  });
  describe('It should delete a recipe', () => {
    it('deletes the recipes, returns a message and data object', () => {
      return request(server)
        .delete('/api/recipes/1')
        .set('authorization', token)
        .expect(200)
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body).toHaveProperty('message');
          expect(res.body).toHaveProperty('data');
          expect(res.body.message).toEqual('recipe has been deleted');
        });
    });
    it('returns a 404 if the recipe is not found', () => {
      return request(server)
        .delete('/api/recipes/9')
        .set('authorization', token)
        .expect(404)
        .then(res => {
          expect(res.status).toEqual(404);
          expect(res.body).toEqual('could not find this recipe');
        });
    });
  });
});
