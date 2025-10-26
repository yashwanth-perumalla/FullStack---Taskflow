import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { Module, Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';

type Task = { id:string; title:string; done:boolean };
const store: Task[] = [{ id:'1', title:'Try TaskFlow', done:false }];

@Controller('tasks')
class TasksController {
  @Get() list(){ return store; }
  @Post() create(@Body() b:{title:string}){ const t={id:crypto.randomUUID(), title:b.title||'Untitled', done:false}; store.push(t); return t; }
  @Patch(':id/toggle') toggle(@Param('id') id:string){ const t=store.find(x=>x.id===id); if(!t) return {message:'not found'}; t.done=!t.done; return t; }
  @Delete(':id') remove(@Param('id') id:string){ const i=store.findIndex(x=>x.id===id); if(i>=0) store.splice(i,1); return {ok:true}; }
}

@Module({ controllers:[TasksController] })
class AppModule {}

async function bootstrap(){
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // <-- use this
  await app.listen(4000);
  console.log('TaskFlow API http://localhost:4000');
}
bootstrap();