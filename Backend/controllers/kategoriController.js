import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const createKategori = async (req, res) => {
    try{
        const response = await prisma.kategori.create({
            data: {
                nama_kategori: req.body.nama_kategori,
                username:req.body.username,
                budget: req.body.budget
            },
        });
        res.status(201).json({ msg: 'Kategori created successfully', data: response });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getAllKategori = async (req, res) => {
    try{
        const response = await prisma.kategori.findMany();
        res.status(200).json({ msg: 'All kategori', data: response });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getKategoriByUsername = async (req, res) => {
    try{
        const response = await prisma.kategori.findMany({
            where: {
                username: req.params.username,
            },
        });
        if (!response) {
            res.status(404).json({ msg: 'Kategori not found' });
        } else {
            res.status(200).json({msg: 'Kategori found', data: response});
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const findIdKategoriByUsernameandNamaKategori = async (req, res) => {
    try{
        const response = await prisma.kategori.findFirst({
            where: {
                username: req.params.username,
                nama_kategori: req.params.nama_kategori,
            },
        });
        if (!response) {
            res.status(404).json({ msg: 'Kategori not found' });
        } else {
            res.status(200).json({msg: 'Kategori found', data: response});
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const updateKategori = async (req, res) => {
    try{
        const response = await prisma.kategori.update({
            where: {
                id_kategori: parseInt(req.params.id_kategori),
            },
            data: {
                nama_kategori: req.body.nama_kategori,
                budget: req.body.budget,
            },
        });
        res.status(200).json({ msg: 'Kategori updated successfully', data: response });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const deleteKategori = async (req, res) => {
    try{
        const response = await prisma.kategori.delete({
            where: {
                id_kategori: parseInt(req.params.id_kategori),
            },
        });
        res.status(200).json({ msg: 'Kategori deleted successfully', data: response });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}



