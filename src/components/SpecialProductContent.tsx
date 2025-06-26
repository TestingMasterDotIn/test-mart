
import { useEffect, useRef, useState } from 'react';
import { Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface SpecialProductContentProps {
  product: Product;
}

const SpecialProductContent: React.FC<SpecialProductContentProps> = ({ product }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timedPopupCount, setTimedPopupCount] = useState(0);

  const handleInstantAlert = () => {
    alert('Instant Alert triggered! This is for testing immediate browser alerts.');
  };

  const handleTimedPopups = () => {
    // 3-second popup
    setTimeout(() => {
      alert('Timed Popup 1: This appeared after 3 seconds');
      setTimedPopupCount(prev => prev + 1);
    }, 3000);

    // 5-second popup
    setTimeout(() => {
      alert('Timed Popup 2: This appeared after 5 seconds');
      setTimedPopupCount(prev => prev + 1);
    }, 5000);

    // 10-second popup
    setTimeout(() => {
      alert('Timed Popup 3: This appeared after 10 seconds');
      setTimedPopupCount(prev => prev + 1);
    }, 10000);
  };

  const handleConfirmDialog = () => {
    if (confirm('Do you want to proceed? This tests confirmation dialogs.')) {
      alert('User confirmed the action!');
    } else {
      alert('User cancelled the action!');
    }
  };

  useEffect(() => {
    const currentContainer = containerRef.current;
    if (!currentContainer || !product.isSpecial) return;

    if (product.specialType === 'iframe') {
      // Create and inject iframe
      const iframe = document.createElement('iframe');
      iframe.src = 'data:text/html;charset=utf-8,<html><body style="margin:0;padding:20px;font-family:Arial;background:linear-gradient(45deg,#ff6b6b,#4ecdc4);color:white;text-align:center;"><h2>Iframe Content</h2><p>This is content inside an iframe for testing!</p><button onclick="alert(\'Button clicked in iframe!\')">Click Me</button></body></html>';
      iframe.width = '100%';
      iframe.height = '200';
      iframe.style.border = '1px solid #ccc';
      iframe.style.borderRadius = '8px';
      iframe.setAttribute('data-testid', `iframe-content-${product.id}`);
      
      currentContainer.appendChild(iframe);
    } else if (product.specialType === 'shadowdom') {
      // Create shadow DOM
      const shadowHost = document.createElement('div');
      shadowHost.setAttribute('data-testid', `shadow-host-${product.id}`);
      const shadowRoot = shadowHost.attachShadow({ mode: 'open' });
      
      shadowRoot.innerHTML = `
        <style>
          .shadow-content {
            padding: 15px;
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            border-radius: 8px;
            text-align: center;
            font-family: Arial, sans-serif;
          }
          .shadow-button {
            background: #fff;
            color: #333;
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
            margin-top: 10px;
          }
          .shadow-button:hover {
            background: #f0f0f0;
          }
        </style>
        <div class="shadow-content" data-testid="shadow-content-${product.id}">
          <h3>Shadow DOM Content</h3>
          <p>This content is encapsulated in Shadow DOM!</p>
          <button class="shadow-button" data-testid="shadow-button-${product.id}">Shadow Button</button>
        </div>
      `;
      
      // Add event listener to shadow DOM button
      const shadowButton = shadowRoot.querySelector(`[data-testid="shadow-button-${product.id}"]`);
      shadowButton?.addEventListener('click', () => {
        alert('Button clicked in Shadow DOM!');
      });
      
      currentContainer.appendChild(shadowHost);
    }

    return () => {
      if (currentContainer) {
        currentContainer.innerHTML = '';
      }
    };
  }, [product]);

  if (!product.isSpecial) {
    return null;
  }

  // Render different content based on special type
  const renderSpecialContent = () => {
    switch (product.specialType) {
      case 'instant-alert':
        return (
          <div className="space-y-3">
            <Button 
              onClick={handleInstantAlert}
              data-testid={`instant-alert-${product.id}`}
              className="w-full"
            >
              Trigger Instant Alert
            </Button>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Click to test immediate browser alert dialogs
            </p>
          </div>
        );

      case 'timed-popup':
        return (
          <div className="space-y-3">
            <Button 
              onClick={handleTimedPopups}
              data-testid={`timed-popup-${product.id}`}
              className="w-full"
            >
              Start Timed Popups ({timedPopupCount}/3)
            </Button>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Triggers alerts after 3s, 5s, and 10s delays
            </p>
          </div>
        );

      case 'confirm-dialog':
        return (
          <div className="space-y-3">
            <Button 
              onClick={handleConfirmDialog}
              data-testid={`confirm-dialog-${product.id}`}
              className="w-full"
            >
              Show Confirmation Dialog
            </Button>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Tests browser confirm() dialog handling
            </p>
          </div>
        );

      case 'modal-popup':
        return (
          <div className="space-y-3">
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button 
                  data-testid={`modal-trigger-${product.id}`}
                  className="w-full"
                >
                  Open Modal System
                </Button>
              </DialogTrigger>
              <DialogContent data-testid={`modal-content-${product.id}`}>
                <DialogHeader>
                  <DialogTitle>Modal Testing System</DialogTitle>
                  <DialogDescription>
                    This modal tests complex popup interactions for automation testing.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <p>This is a complex modal system with multiple interaction points.</p>
                  <div className="flex space-x-2">
                    <Button 
                      onClick={() => alert('Action 1 executed!')}
                      data-testid={`modal-action1-${product.id}`}
                      size="sm"
                    >
                      Action 1
                    </Button>
                    <Button 
                      onClick={() => alert('Action 2 executed!')}
                      data-testid={`modal-action2-${product.id}`}
                      size="sm"
                      variant="outline"
                    >
                      Action 2
                    </Button>
                  </div>
                  <Button 
                    onClick={() => setIsModalOpen(false)}
                    data-testid={`modal-close-${product.id}`}
                    className="w-full"
                  >
                    Close Modal
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Tests modal dialogs with multiple interaction layers
            </p>
          </div>
        );

      default:
        return <div ref={containerRef} className="border rounded-lg p-2 bg-gray-50 dark:bg-gray-800" />;
    }
  };

  return (
    <div className="mt-4">
      <h4 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
        Special Content ({product.specialType}):
      </h4>
      {renderSpecialContent()}
    </div>
  );
};

export default SpecialProductContent;
