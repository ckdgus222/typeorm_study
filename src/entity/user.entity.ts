import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { ProfileModel } from './profile.entity';
import { PostModel } from './post.entity';

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity()
export class UserModel {
  // ID
  // 자동으로 ID를 생성한다.

  //   @PrimaryGeneratedColumn()
  //  직접 Primary 값을 넣어야한다.
  //   @PrimaryColumn()

  // @PrimaryGeneratedColumn('uuid')
  // PrimaryGeneratedColumn -> 순서대로 위로 올라간다.
  // 1,2,3,4,5,6

  // UUID 값을 넣을수도 있다.
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  //   // 제목
  //   @Column({
  //     // 데이터베이스에서 인지하는 컬럼 타입
  //     // 특정한 타입을 원할때. 사용
  //     type: 'varchar',
  //     // 데이터베이스 칼럼 이름
  //     name: 'title',
  //     length: 300,
  //     // null 이 가능한지
  //     nullable: true,
  //     update: false,
  //     // 기본값이 true
  //     select: false,
  //     default: 'default value',

  //     // 칼럼중에서 유일무이한 값이 돼야하는지
  //     unique: false,
  //   })
  //   title: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  // 데이터 생성 일자
  // 데이터가 생성되는 날짜와 시간이 자동으로 찍힌다.
  @CreateDateColumn()
  createdAt: Date;

  // 데이터 업데이트 일자
  // 데이터가 업데이트되는 날짜와 시간이 자동으로 찍힌다.
  @UpdateDateColumn()
  updatedAt: Date;

  // 데이터가 업데이트 될때마다 1씩 올라간다.
  // 처음 생성되면 값을 1이다.
  // save() 함수가 몇번 불렸는지 기억한다.
  @VersionColumn()
  version: number;

  // Generated 는 Column 어노테이션과 같이 사용해야함.
  // Primary 컬럼이랑은 다르게 고유값은 아니지만 값이 생성됨.
  @Column()
  @Generated('uuid')
  additionalId: number;

  @OneToOne(() => ProfileModel, (profile) => profile.user, {
    // find() 실행 할때마다 항상 같이 가져올 relation
    eager: false,
    // 저장할때 relation을 한번에 같이 저장 가능.
    cascade: false,
    // null 가능한지
    nullable: true,
    // 관계가 삭제됐을때
    // no action -> 아무것도 안함
    // casecade -> 참조하는 Row도 같이 삭제
    // set null -> 참조하는 Row에서 참조 id를 null 변경
    // set default -> 기본 세팅으로 설정 (테이블의 기본 세팅)
    // restrict -> 참조하고 있는 Row가 있는경우 참조당하는 Row 삭제 불가
    onDelete: 'RESTRICT',
  })
  profile: ProfileModel;

  @OneToMany(() => PostModel, (post) => post.author)
  posts: PostModel[];

  @Column({
    default: 0,
  })
  count: number;
}
