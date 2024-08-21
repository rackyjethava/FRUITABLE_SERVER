const express = require('express');
const { VariantController } = require('../../../controller');
const upload = require('../../../middelware/upload');

const router = express.Router();

router.get(
    '/get-variant/:variant_id',
    VariantController.getVariant
);

router.get(
    '/list-variant',
    VariantController.listVariants
);

router.post(
    '/add-variant',
    upload.array("variantImg",5),
    VariantController.addVariant
);

router.put(
    '/update-variant/:variant_id',
    upload.array("variantImg",5),
    VariantController.updateVariant
);

router.delete(
    '/delete-variant/:variant_id',
    VariantController.deleteVariant
);

module.exports = router;
