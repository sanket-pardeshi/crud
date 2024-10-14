import { Component } from '@angular/core';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  productForm: { id: number | null; name: string; price: number } = { id: null, name: '', price: 0 };

  products: { id: number; name: string; price: number }[] = [];

  constructor(private productService: ProductService) {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe((data: any) => {
      this.products = data;
    });
  }

  saveProduct() {
    if (this.productForm.id === null) {
      this.productService.createProduct(this.productForm).subscribe((data: any) => {
        this.getProducts(); 
        this.resetForm();
      });
    } else {
      this.productService.updateProduct(this.productForm.id, this.productForm).subscribe((data: any) => {
        this.getProducts(); 
        this.resetForm();
      });
    }
  }

  deleteProduct(id: number | undefined) {
    if (id) {
      this.productService.deleteProduct(id).subscribe((data: any) => {
        this.getProducts();
      });
    }
  }

  // Method to populate form when editing a product
  editProduct(product: { id: number; name: string; price: number }) {
    this.productForm = { ...product }; // Shallow copy the product to the form
  }

  // Method to reset the form
  resetForm() {
    this.productForm = { id: null, name: '', price: 0 }; // Reset form
  }
}
