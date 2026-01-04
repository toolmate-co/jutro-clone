import PropTypes from "prop-types";
import styles from "./ImageCard.module.scss";
import { messages } from "./ImageCard.messages";
import { useTranslator } from "@i18n";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?q=80&w=1546&auto=format&fit=crop";

const ImageCard = ({ name, imageSrc, description, altText, onClick }) => {
  const translator = useTranslator();

  const titleText = translator(messages.title, { name });
  const descriptionText = description ?? translator(messages.description);
  const resolvedImageSrc = imageSrc ?? DEFAULT_IMAGE;

  return (
    <div
      className={styles.imageCard}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className={styles.imageWrapper}>
        <img
          className={styles.image}
          src={resolvedImageSrc}
          alt={altText || titleText}
          loading="lazy"
        />
      </div>

      <div className={styles.content}>
        <h2 className={styles.title}>{titleText}</h2>
        <p className={styles.description}>{descriptionText}</p>
      </div>
    </div>
  );
};

ImageCard.propTypes = {
  name: PropTypes.string,
  imageSrc: PropTypes.string,
  description: PropTypes.string,
  altText: PropTypes.string,
  onClick: PropTypes.func,
};

ImageCard.defaultProps = {
  name: "Sample",
  imageSrc: DEFAULT_IMAGE,
  description: null,
  altText: null,
  onClick: undefined,
};

export default ImageCard;
