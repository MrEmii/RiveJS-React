import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Rive from 'rive-canvas'


export class FiveAnimation extends Component {
    constructor() {
        super();

        this.canvasRef;
        this.canvasContext;
        this.renderer;
        this.lastTime = 0;

    }

    async loadRiveModule() {
        let loadRive = Rive({ locateFile: (file) => 'https://unpkg.com/rive-canvas@latest/' + file, });

        this.rive = await Promise.resolve(loadRive)

        const file = rive.load(this.props.file);

        this.artboard = file.defaultArtboard();

        this.renderer = new rive.CanvasRenderer(this.canvasContext);
    }

    animate(delta) {
        const animation = this.artboard.animation(this.props.animation);
        const instance = this.rive.LinearAnimationInstance(animation);
        instance.advance(delta);
        instance.apply(this.artboard, 1.0);
    }

    componentDidMount() {
        if (this.canvasRef) this.canvasContext = this.canvasRef.getContext('2d');
    }

    componentDidUpdate() {
        if (this.canvasRef) this.canvasContext = this.canvasRef.getContext('2d');
    }

    render() {
        const { width, height } = this.props;

        if (!this.lastTime) this.lastTime = Date.now();

        const delta = (time - lastTime) / 1000;
        this.lastTime = Date.now();

        animate(delta)
        this.artboard.advance(delta);

        this.canvasContext.clearRect(0, 0, this.canvasRef.width, this.canvasRef.height);
        this.canvasContext.save();
        this.renderer.align(this.rive.Fit.contain, this.rive.Alignment.center, {
            minX: 0,
            minY: 0,
            maxX: this.canvasRef.width,
            maxY: this.canvasRef.height
        }, this.artboard.bounds);
        this.artboard.draw(renderer);
        this.canvasContext.restore();
        requestAnimationFrame(draw);

        return <canvas ref={node => this.canvasRef = node} className={this.props.className} style={{
            width: width + "px",
            height: height + "px",
        }}></canvas>
    }
}

FiveAnimation.propTypes = {
    file: PropTypes.object.isRequired,
    isPaused: PropTypes.bool,
    animation: PropTypes.string.isRequired,

}