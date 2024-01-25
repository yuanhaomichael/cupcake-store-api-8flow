import { writeFileSync, readFileSync, existsSync, unlinkSync, readdirSync } from 'fs';
import { join } from 'path';

/*
  Usage:

  const db = new FileDB();

  db.create('cupcake1', { flavor: 'Chocolate', price: 2.99 });
  const cupcake = db.get('cupcake1');
  db.update('cupcake1', { flavor: 'Vanilla', price: 3.49 });
  db.delete('cupcake1');
*/

interface Record {
  [key: string]: any;
}

class FileDB {
  private directory: string;

  constructor(directory: string = 'documents') {
    this.directory = directory;
    // Ensure the directory exists, create if it doesn't
    if (!existsSync(this.directory)) {
      require('fs').mkdirSync(this.directory);
    }
  }

  create(key: string, value: Record): void {
    const filePath = join(this.directory, `${key}.json`);
    const data = JSON.stringify(value, null, 2);
    writeFileSync(filePath, data);
  }

  get(key: string): Record | null {
    const filePath = join(this.directory, `${key}.json`);
    if (!existsSync(filePath)) {
      return null;
    }
    const data = readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  }

  update(key: string, value: Record): void {
    const filePath = join(this.directory, `${key}.json`);
    if (!existsSync(filePath)) {
      throw new Error('Record not found');
    }
    const data = JSON.stringify(value, null, 2);
    writeFileSync(filePath, data);
  }

  delete(key: string): void {
    const filePath = join(this.directory, `${key}.json`);
    if (existsSync(filePath)) {
      unlinkSync(filePath);
    }
  }

  list(): Record[] {
    const files = readdirSync(this.directory);
    return files.map(file => {
      const filePath = join(this.directory, file);
      const data = readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    });
  }
}

export default FileDB;
