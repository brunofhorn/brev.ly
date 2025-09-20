// src/shared/either.ts
var isLeft = (e) => {
  return e.left !== void 0;
};
var isRight = (e) => {
  return e.right !== void 0;
};
var unwrapEither = ({
  left,
  right
}) => {
  if (right !== void 0 && left !== void 0) {
    throw new Error(
      `Received both left and right values at runtime when opening an Either
Left: ${JSON.stringify(
        left
      )}
Right: ${JSON.stringify(right)}`
    );
  }
  if (left !== void 0) {
    return left;
  }
  if (right !== void 0) {
    return right;
  }
  throw new Error(
    "Received no left or right values at runtime when opening Either"
  );
};
var makeLeft = (value) => ({ left: value });
var makeRight = (value) => ({ right: value });

export {
  isLeft,
  isRight,
  unwrapEither,
  makeLeft,
  makeRight
};
