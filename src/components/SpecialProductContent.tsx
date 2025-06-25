
import { useEffect, useRef } from 'react';
import { Product } from '@/data/products';

interface SpecialProductContentProps {
  product: Product;
}

const SpecialProductContent: React.FC<SpecialProductContentProps> = ({ product }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !product.isSpecial) return;

    if (product.specialType === 'iframe') {
      // Create and inject iframe
      const iframe = document.createElement('iframe');
      iframe.src = 'data:text/html;charset=utf-8,<html><body style="margin:0;padding:20px;font-family:Arial;background:linear-gradient(45deg,#ff6b6b,#4ecdc4);color:white;text-align:center;"><h2>Iframe Content</h2><p>This is content inside an iframe for testing!</p><button onclick="alert(\'Button clicked in iframe!\')">Click Me</button></body></html>';
      iframe.width = '100%';
      iframe.height = '200';
      iframe.style.border = '1px solid #ccc';
      iframe.style.borderRadius = '8px';
      iframe.setAttribute('data-testid', `iframe-content-${product.id}`);
      
      containerRef.current.appendChild(iframe);
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
      
      containerRef.current.appendChild(shadowHost);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [product]);

  if (!product.isSpecial) {
    return null;
  }

  return (
    <div className="mt-4">
      <h4 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
        Special Content ({product.specialType}):
      </h4>
      <div ref={containerRef} className="border rounded-lg p-2 bg-gray-50 dark:bg-gray-800" />
    </div>
  );
};

export default SpecialProductContent;
