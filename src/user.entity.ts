// // src/user/user.entity.ts
// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   CreateDateColumn,
//   UpdateDateColumn,
// } from 'typeorm';
// import * as bcrypt from 'bcrypt';
//
// @Entity('users') // Specifies the table name in the database
// export class User {
//   @PrimaryGeneratedColumn('uuid') // Generates a unique ID for each user
//   id: string;
//
//   @Column({ unique: true }) // Ensures email addresses are unique
//   email: string;
//
//   @Column()
//   passwordHash: string; // Stores the hashed passwor
//
//   @CreateDateColumn()
//   createdAt: Date;
//
//   @UpdateDateColumn()
//   updatedAt: Date;
//
//   // Method to hash the password before saving
//   async hashPassword(password: string): Promise<void> {
//     this.passwordHash = await bcrypt.hash(password, 10); // 10 is the salt rounds
//   }
//
//   // Method to compare a plain password with the stored hash
//   async comparePassword(password: string): Promise<boolean> {
//     return bcrypt.compare(password, this.passwordHash);
//   }
// }
