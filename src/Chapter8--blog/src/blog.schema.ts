import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Blog {
    @Prop({ required: true }) title: string;
    @Prop({ required: true }) author: string;
    @Prop({ required: true }) content: string;
    @Prop({ required: true }) createdAt: Date;
    @Prop() updatedAt: Date;
}

export type BlogDocument = Blog & Document;

export const BlogSchema = SchemaFactory.createForClass(Blog);
