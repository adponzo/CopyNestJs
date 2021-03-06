import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { unlinkSync } from 'fs';
import { Model } from 'mongoose';
import { join } from 'path';
import { Cardapio } from './cardapio';

@Injectable()
export class CardapioService {
    constructor(@InjectModel('Cardapio') private readonly cardapioModel: Model<Cardapio>) { }

    async getAll(query: any) {
        // return await this.cardapioModel.find().exec();
        const hasFilterByName = query.name ? true : false;
        const filter = { }
        if (hasFilterByName) {
            // https://docs.mongodb.com/manual/reference/operator/query/regex/
            filter['name'] = { $regex: '.*' + query.name + '.*', $options: 'i' }
        }
        return await this.cardapioModel.find(filter).populate('category').exec();
    }

    async getById(id: string) {
        return await this.cardapioModel.findById(id).exec();
    }

    private getPhotoUrl(filename: string) {
        return `${process.env.APPLICATION_URL}/${filename}`;
        // return `http://localhost:3000/${filename}`;
        // return `http://192.168.1.101:3000/${filename}`;
    }

    async create(cardapio: Cardapio, file: Express.Multer.File) {
        if (file) {
            cardapio.photoUrl = this.getPhotoUrl(file.filename);
        }

        const createdProduct = new this.cardapioModel(cardapio);
        return await createdProduct.save();
    }

    async update(id: string, cardapio: Cardapio, file: Express.Multer.File) {
         // se veio uma imagem
         if (file) {
            // procuro o produto para ver se ele já tem foto
            const product = await this.getById(id);

            if (product.photoUrl) {
                // se tem foto eu vou deletar a foto antiga
                const imageName = product.photoUrl.substring(product.photoUrl.lastIndexOf('/') + 1);
                const imagePath = join(__dirname, '..', '..', '..', 'uploads', imageName);
                console.log(imagePath);
                unlinkSync(imagePath);
            }

            cardapio.photoUrl = this.getPhotoUrl(file.filename);
        }

        return await this.cardapioModel.findByIdAndUpdate(id, cardapio, { new: true });
    }

    async delete(id: string) {
        return await this.cardapioModel.deleteOne({ _id: id }).exec();
    }
}