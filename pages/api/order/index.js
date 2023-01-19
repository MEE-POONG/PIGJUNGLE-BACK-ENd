import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        let page = +req.query.page || 1;
        let pageSize = +req.query.pageSize || 10;
        const data = await prisma.$transaction([
          prisma.order.count(),
          prisma.order.findMany({
            include: { 
              OrderDetail:{
                include:{
                  products: true
                }

            }},
            skip: (page - 1) * pageSize,
            take: pageSize,
          }),
        ]);
        const totalPage = Math.ceil(data[0] / pageSize);
        res.status(200).json({ data: data[1], page, pageSize, totalPage });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      console.log("req.body", req.body);
      try {
        await prisma.order.create({
          data: {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            tel:req.body.tel,
            image:req.body.image,
            email:req.body.email,
            address:req.body.address,
            subDistrict:req.body.subDistrict,
            district:req.body.district,
            postalCod:req.body.postal,
            province:req.body.province,
            status:req.body.status,
            total:parseInt(req.body.total),
            
            OrderDetail: {
              sumPrice:parseInt(req.body.sumPrice),
              sumQty:parseInt(req.body.sumQty),
              create: 
                req.body.productIdList.map((product) => ({
                  productId: product.productId,
                })),
              
            },
          },
        });
        res.status(201).json({ success: true });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
