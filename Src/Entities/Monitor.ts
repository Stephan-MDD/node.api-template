import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Monitor extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: true })
	userId: string; // user reference?

	@Column({ nullable: true })
	initialErrorName: string;

	@Column({ nullable: true })
	errorName: string;

	@Column({ nullable: true })
	errorMessage: string;

	@Column({ nullable: true })
	errorType: string;

	@Column()
	entryTime: string;

	@Column()
	processTime: number;

	@Column()
	url: string;

	@Column()
	method: string;

	@Column('bigint')
	memoryUsage: number;

	// CPUs = os.cpus();
	// CPU_Usage = process.cpuUsage();
}
