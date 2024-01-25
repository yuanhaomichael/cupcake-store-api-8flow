import FileDB from '../src/database/FileDB'
import { rmdirSync, readdirSync, unlinkSync } from 'fs'
import { join } from 'path';

describe('FileDB', () => {
  const testDirectory = './src/database/test_documents';
  const db = new FileDB(testDirectory);

  const testCupcake = {
    flavor: 'Chocolate',
    price: 2.99,
  };

  // Clean up
  afterEach(() => {
    db.delete('testCupcake');
  });

  afterAll(() => {
    const files = readdirSync(testDirectory);
    files.forEach(file => unlinkSync(join(testDirectory, file)));
    rmdirSync(testDirectory);
  });

  test('should create a new record', () => {
    db.create('testCupcake', testCupcake);
    const cupcake = db.get('testCupcake');
    expect(cupcake).toEqual(testCupcake);
  });

  test('should update an existing record', () => {
    db.create('testCupcake', testCupcake);
    const updatedCupcake = { ...testCupcake, flavor: 'Vanilla' };
    db.update('testCupcake', updatedCupcake);
    const cupcake = db.get('testCupcake');
    expect(cupcake).toEqual(updatedCupcake);
  });

  test('should delete a record', () => {
    db.create('testCupcake', testCupcake);
    db.delete('testCupcake');
    const cupcake = db.get('testCupcake');
    expect(cupcake).toBeNull();
  });

});