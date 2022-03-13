// fetch Link from database using Prisma instance then invoke
// postedBy on it

function postedBy(parent, args, context) {
  return context.prisma.link
    .findUnique({
      where: {
        id: parent.id,
      },
    })
    .postedBy();
}

function votes(parent, args, context) {
  return context.prisma.link.findUnique({ where: { id: parent.id } }).votes();
}

module.exports = { postedBy, votes };
