import { Button } from '@web-app/app/components/Button';
import { Modal } from '@web-app/app/components/Modal';
import { ViewModalState } from '../List';
import ViewRecipe from '@web-app/app/components/ViewRecipe';

type ViewRecipesModalProps = {
  modal: ViewModalState;
  setModal: React.Dispatch<React.SetStateAction<ViewModalState>>;
};

export const ViewRecipesModal: React.FC<ViewRecipesModalProps> = ({
  modal,
  setModal,
}) => {
  if (!modal.recipe) {
    return null;
  }

  return (
    <Modal isOpen={true} onClose={() => setModal({ isOpen: false })}>
      <ViewRecipe recipe={modal.recipe} />
      <div className="flex justify-center">
        <Button onClick={() => setModal({ isOpen: false })}>Close</Button>
      </div>
    </Modal>
  );
};
