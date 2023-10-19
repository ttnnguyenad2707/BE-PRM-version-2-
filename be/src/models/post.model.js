const mongoose = require("mongoose");
const slugify = require('slugify');


const Post = new mongoose.Schema({
  category: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
    maxlength: 100
  },
  address: {
    type: String,
    required: true
  },
  area: {
    type: String,
    required: true
  },
  maxPeople: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true
  },
  deposit: {
    type: Number,
  },
  security: {
    type: [String],
  },
  utils: {
    type: [String],
  },
  interior: {
    type: [String],
  },
  slug: {
    type: String, unique: true
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
  images: {
    type: [String],
  }, 
  owner: {
    type: String,
    required: true,
  }

}, { timestamps: true });


Post.pre('save', function (next) {
  if (!this.isModified('title')) {
    return next();
  }

  this.slug = slugify(this.title, { lower: true });
  this.constructor
    .findOne({ slug: this.slug })
    .then(existingDoc => {
      if (existingDoc) {
        let suffix = 1;
        const findUniqueSlug = async () => {
          const newSlug = `${this.slug}-${suffix}`;
          const doc = await this.constructor.findOne({ slug: newSlug });
          if (doc) {
            suffix++;
            await findUniqueSlug();
          } else {
            this.slug = newSlug;
            next();
          }
        };
        findUniqueSlug();
      } else {
        next();
      }
    })
    .catch(error => next(error));
});
module.exports = mongoose.model("Post", Post);